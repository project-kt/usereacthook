import { hookFacotory } from "./mock-db";

export const handlers = [...hookFacotory.hook.toHandlers("rest")];
