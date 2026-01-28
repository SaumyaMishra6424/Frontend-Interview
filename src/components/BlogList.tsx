import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function BlogList({
  onSelect,
  selectedTag,
}: {
  onSelect: (id: number) => void;
  selectedTag: string | null;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  /* 🔹 Skeleton Loader */
  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-xl bg-neutral-800" />
        <Skeleton className="h-24 rounded-xl bg-neutral-800" />
        <Skeleton className="h-24 rounded-xl bg-neutral-800" />
      </div>
    );

  if (isError)
    return (
      <p className="text-sm text-red-400 bg-red-500/10 rounded-lg p-3">
        Failed to load blogs
      </p>
    );

  /* 🔹 Tag Filtering */
  const filteredBlogs = selectedTag
    ? data?.filter((blog) =>
        blog.category.includes(selectedTag)
      )
    : data;

  return (
    <div className="space-y-4">
      {filteredBlogs?.map((blog) => (
        <Card
          key={blog.id}
          tabIndex={0}
          role="button"
          aria-label={`Open blog ${blog.title}`}
          onClick={() => onSelect(blog.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(blog.id);
            }
          }}
          className="
            group cursor-pointer overflow-hidden rounded-xl
            border border-white/10
            bg-gradient-to-br from-neutral-900/70 to-neutral-900
            backdrop-blur
            transition-all duration-300
            hover:border-indigo-500/50
            hover:-translate-y-1
            hover:shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_20px_40px_-15px_rgba(0,0,0,0.9)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-indigo-400
          "
        >
          <CardContent className="p-4 space-y-2">

            {/* CATEGORY */}
            <p className="text-[11px] uppercase tracking-widest text-indigo-400">
              {blog.category.join(" • ")}
            </p>

            {/* TITLE */}
            <h3
              className="
                text-base font-semibold text-white
                transition-colors duration-300
                group-hover:text-indigo-400
              "
            >
              {blog.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-neutral-400 line-clamp-2">
              {blog.description}
            </p>

            {/* FOOTER */}
            <div className="pt-2 text-xs text-neutral-500">
              Read more →
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}
