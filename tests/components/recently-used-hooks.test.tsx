import RecentlyUsedHooks from "@/app/_components/recently-used-hooks";
import { Hook } from "@/server/db/schema";
import { render } from "@testing-library/react";
import axios from "axios";
import { hookFacotory } from "tests/mocks/mock-db";

describe("RecentlyUsedHooks", () => {
  // let hooks: Hook[] = [];

  // beforeAll(() => {
  //   Array.of(1, 2, 3).forEach(() => {
  //     hooks.push(hookFacotory.hook.create());
  //   });
  // });

  // afterAll(() => {
  //   hookFacotory.hook.deleteMany({ where: { id: { in: hooks.map((hook) => hook.id) } } });
  // });

  it("should render", () => {
    render(<RecentlyUsedHooks />);
  });
});
