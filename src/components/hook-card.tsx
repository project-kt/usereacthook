"use client";

import { copyToClipboard } from "@/lib/utils";
import axios from "axios";
import { Atom, Check, Rabbit } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { type ReactHook } from "@/server/db/schema";
import { fromBase64 } from "@/lib/base64";

function HookCard({ hook }: { hook: ReactHook }) {
  const handleIncrementClickCount = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hook/statistics/incrementClickCount?hookId=${hook.id}`);
  };

  return (
    <Card className="hover:border-gradient group relative w-full">
      <CardHeader>
        <CardTitle className="text-gradient mb-2">{hook.title}</CardTitle>
        <CardDescription className="line-clamp-2">{hook.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap">
        <Link
          href={`/docs/${hook.title}`}
          className="text-gradient flex items-center"
          onClick={handleIncrementClickCount}
        >
          Discover
          <Atom className="ml-2 h-4 w-4" color="#52ddfd" />
        </Link>
        <CardCopyAction hook={hook} />
      </CardFooter>
    </Card>
  );
}

export default HookCard;

const CardCopyAction = ({ hook }: { hook: ReactHook }): React.JSX.Element => {
  const [fileContent, setFileContent] = React.useState<string | null>(null);

  const fetchFileContent = async (code: string) => {
    const decodedContent = fromBase64(code);
    await copyToClipboard(decodedContent);
  };

  const handleCopyHook = async () => {
    await fetchFileContent(hook.code);
    // await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hook/statistics/incrementCopyCount?hookId=${hook.id}`);

    setTimeout(() => {
      setFileContent(null);
    }, 1000);
  };

  return (
    <Button size={"sm"} variant="ghost" className="ml-auto" onClick={handleCopyHook}>
      {fileContent ? (
        <div className="flex items-center">
          Copied
          <Check className="ml-2 h-4 w-4" />
        </div>
      ) : (
        <div className="flex items-center">
          Fast copy code
          <Rabbit className="ml-2 h-4 w-4" />
        </div>
      )}
    </Button>
  );
};
