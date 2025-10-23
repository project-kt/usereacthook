import { db } from "@/server/db";
import {
  buildPrompt,
  callOpenAI,
  getHookTitles,
  type HookError,
  mapOpenAI,
  parseOpenAI,
  saveHook,
  statusFor,
  validateOpenAI
} from "./hook.service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const result = await getHookTitles(db)
    .map(buildPrompt)
    .andThen(callOpenAI)
    .andThen(parseOpenAI)
    .map(mapOpenAI)
    .andThen(validateOpenAI)
    .andThen((hook) => saveHook(db, hook));

  if (result.isErr()) {
    const e: HookError = result.error;
    return NextResponse.json({ tag: e.tag, error: e.message }, { status: statusFor(e) });
  }

  return NextResponse.json(result.value);
};
