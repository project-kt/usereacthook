import { Result } from "neverthrow";

export const safeJsonParse = <T, E>(raw: string, toError: (e: unknown) => E) =>
  Result.fromThrowable((s: string) => JSON.parse(s) as T, toError)(raw);
