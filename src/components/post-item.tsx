import Link from "next/link";
import { Calendar } from "lucide-react";

interface PostItemProps {
  id: number;
  title: string;
  content: string;
  date: Date;
}

export function PostItem({
    id,
    title,
    content,
    date
  }: PostItemProps) {
  const publishedDate: string = date.toLocaleDateString(
    "ja-JP",
    {year: "numeric", month: "2-digit", day: "2-digit"}
  ).replaceAll("/", "-")

  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div>
        <h2 className="font-semibold text-2xl leading-tight">
          {title}
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground truncate">{content}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time>{publishedDate}</time>
          </dd>
        </dl>
        <Link
          href={{
            pathname: `/blog/${id}`,
            query: {
              title: title,
              content: content
            }
          }}
          className="text-sm"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
