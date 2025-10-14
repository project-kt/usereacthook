import HookCard from "@/components/hook-card";
import { db } from "@/server/db";
import React from "react";

async function NewHooks(): Promise<React.JSX.Element | undefined> {
  const hooks = await db.query.reactHooks.findMany({
    limit: 5,
    orderBy: (t, { desc }) => [desc(t.created_at)]
  });

  if (hooks && hooks.length > 0) {
    return (
      <section>
        <div className="mb-4 flex flex-row items-center gap-x-3">
          <span className="text-main text-gradient text-3xl">#</span>
          <h4 className="text-2xl font-extrabold">New Hooks</h4>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {hooks.map((hook) => {
            return <HookCard key={hook.id} hook={hook} />;
          })}
        </div>
      </section>
    );
  }
}

export default NewHooks;
