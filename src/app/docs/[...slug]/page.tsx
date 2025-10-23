import React from "react";

type HookPageProps = {
  params: {
    slug: string[];
  };
};

async function HookDocsIndex({ params }: HookPageProps): Promise<React.JSX.Element> {
  return <div>{params.slug}</div>;
}

export default HookDocsIndex;
