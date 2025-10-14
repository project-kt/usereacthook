import { env } from "@/env";
import { toBase64 } from "@/lib/base64";
import { openai } from "@/lib/openai";
import { safeJsonParse } from "@/lib/safeParse";
import { type DB } from "@/server/db";
import { eq } from "drizzle-orm";
import {
  type NewReactHook,
  NewReactHookSchema,
  type ReactHook,
  reactHooks,
  type ReactHookTitleOnly,
  reactionCounters
} from "@/server/db/schema";
import { err, ok, type Result, ResultAsync } from "neverthrow";

export type HookError =
  | { tag: "Parse Error"; message: string }
  | { tag: "NotFound"; message: string }
  | { tag: "DB Error"; message: string }
  | { tag: "OpenAI Error"; message: string }
  | { tag: "Validation Error"; message: string };

export function getHookTitles(db: DB): ResultAsync<string[], HookError> {
  return ResultAsync.fromPromise(
    db.query.reactHooks.findMany({ columns: { title: true } }),
    (e): HookError => ({ tag: "DB Error", message: String(e) })
  ).map((rows: ReactHookTitleOnly[]) => rows.map((hook) => hook.title));
}

export function buildPrompt(existingTitles: string[]) {
  const systemMessage = `
You are an expert React 18+ developer. Output ONLY one JSON object with EXACT fields:
- title: string
- description: string (1-3 sentences; clearly state the real problem this hook solves)
- code: string (TypeScript, idiomatic React 18+; concise; NO classes; export a hook starting with "use")
- documentation: string (Markdown; starts with "# <title>"; includes the sections below)

Hard constraints:
- The hook must be practically useful in real apps, but SIMPLE to understand and integrate.
- Keep the code focused and compact: roughly 30-120 lines max. Avoid complex option objects and rare edge cases.
- Prefer common utilities: debounce/throttle state, async with cancellation, event listeners, clipboard, local/session storage, media/visibility, intersection observer, element size/position, keyboard shortcuts, etc.
- Disallowed: no-op/trivial wrappers, over-engineered solutions, large state machines, legacy APIs, or external deps beyond React.
- Output JSON only. No backticks around the JSON. No extra fields.

Documentation requirements (must be Markdown):
1) "# <title>"
2) Overview (why and when to use)
3) Installation
4) API (parameters with types, return shape)
5) Usage (quick start snippet)
6) Full Example (a working component using the hook)
7) Hook Source Code (a fenced TypeScript code block that contains EXACTLY the same code as in "code")
8) Explanation of Key Parts (bullet points explaining the main logic)
9) Edge Cases & Tips (cleanup, cancellation, SSR notes, performance)
10) License note

Quality rules:
- The "Hook Source Code" section must include the exact code from "code", in a single fenced block marked as TypeScript.
- Keep docs clear and concise; avoid verbosity.
- Ensure examples compile with React 18+.

Self-check (must be true):
1) Title starts with "use" and is not in the user list.
2) Code compiles as a React 18+ hook and is under ~120 lines.
3) API is easy to use (1-3 parameters; returns a simple tuple/object).
4) Documentation includes all required sections, and the Hook Source Code block matches "code" exactly.
`.trim();

  const userMessage = `
Existing hooks (do not repeat any of these):
${existingTitles.join("\n")}

Create a NEW, concise, practical hook. Return ONLY a JSON object with:
- title
- description (1-3 sentences)
- code (TypeScript, React 18+, clean and short; NO classes)
- documentation (Markdown including: Overview, Installation, API, Usage, Full Example, Hook Source Code that matches "code", Explanation of Key Parts, Edge Cases & Tips, License)

Prioritize simplicity, readability, and immediate developer value over completeness.
`.trim();

  return { systemMessage, userMessage };
}

export async function mockOpenAI() {
  return `{
  "title": "useInterval",
  "code": "Ly8gZGVtbyBjb2RlIGZvciB1c2VJbnRlcnZhbA==",
  "documentation: "IyB1c2VJbnRlcnZhbA0KQSBtZW1vIGhvb2sgdG8gc2V0dXAgaW50ZXJ2YWxzIGluIFJlYWN0Lg=="
}`;
}

export function callOpenAI({
  systemMessage,
  userMessage
}: {
  systemMessage: string;
  userMessage: string;
}): ResultAsync<string, HookError> {
  return ResultAsync.fromPromise(
    // mockOpenAI(),
    openai.chat.completions.create({
      model: env.OPENAI_MODEL ?? "gpt-5-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ]
    }),
    (e): HookError => ({ tag: "OpenAI Error", message: String(e) })
  ).andThen((completion) => {
    // const raw = completion;
    const raw = completion.choices[0]?.message?.content ?? "";
    if (!raw) {
      return err<string, HookError>({
        tag: "OpenAI Error",
        message: "OpenAI returned empty content"
      });
    }

    return ok<string, HookError>(raw);
  });
}

export function parseOpenAI(raw: string): Result<NewReactHook, HookError> {
  console.log("openai res", raw);
  return safeJsonParse<NewReactHook, HookError>(raw, () => ({
    tag: "Parse Error",
    message: "Failed to parse OpenAI response JSON"
  }));
}

export function mapOpenAI(hook: NewReactHook): NewReactHook {
  return {
    title: hook.title,
    description: hook.description ?? null,
    code: toBase64(hook.code),
    documentation: toBase64(hook.documentation)
  };
}

export function validateOpenAI(hook: NewReactHook): Result<NewReactHook, HookError> {
  console.log("parsed hook", hook);

  const parsed = NewReactHookSchema.safeParse(hook);
  if (parsed.error) {
    return err<NewReactHook, HookError>({
      tag: "Validation Error",
      message: parsed.error.message
    });
  }

  return ok<NewReactHook, HookError>(parsed.data);
}

export function saveHook(db: DB, hook: NewReactHook): ResultAsync<ReactHook, HookError> {
  return ResultAsync.fromPromise(
    db.transaction(async (tx) => {
      const res = await tx.insert(reactHooks).values(hook).execute();
      const id = Number(res[0].insertId);

      await tx.insert(reactionCounters).values({ hook_id: id });

      const [insertedHook] = await tx.select().from(reactHooks).where(eq(reactHooks.id, id)).limit(1);

      return insertedHook;
    }),
    (e): HookError => ({ tag: "DB Error", message: String(e) })
  ).andThen((insertedHook) => {
    if (!insertedHook) {
      return err<ReactHook, HookError>({
        tag: "NotFound",
        message: `${hook.title} was not inserted`
      });
    }
    return ok<ReactHook, HookError>(insertedHook);
  });
}

export function statusFor(e: HookError): number {
  switch (e.tag) {
    case "Parse Error":
      return 400;
    case "NotFound":
      return 404;
    case "Validation Error":
      return 422;
    case "DB Error":
      return 500;
    case "OpenAI Error":
      return 502;
  }
}
