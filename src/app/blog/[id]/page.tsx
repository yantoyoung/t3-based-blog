"use client"

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const searchParams = useSearchParams();

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <article className="flex flex-col gap-2 border-border border-b py-3">
            <div>
              <h2 className="font-semibold text-2xl leading-tight">
                {searchParams.get("title")}
              </h2>
            </div>
          </article>
          <div className="max-w-none text-muted-foreground">{searchParams.get("content")}</div>
          <div className="flex justify-between items-center py-2">
            <Link href="/">← Back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
