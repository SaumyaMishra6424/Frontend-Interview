import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";

export default function BlogDetails({
  blogId,
}: {
  blogId: number | null;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId)
    return (
      <div className="h-full flex items-center justify-center text-neutral-500 text-sm">
        Select a blog to read
      </div>
    );

  if (isLoading)
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-64 bg-neutral-800 rounded-2xl" />
        <div className="h-8 w-3/4 bg-neutral-800 rounded" />
        <div className="h-4 w-1/2 bg-neutral-800 rounded" />
        <div className="h-4 bg-neutral-800 rounded" />
        <div className="h-4 bg-neutral-800 rounded" />
      </div>
    );

  if (isError)
    return (
      <p className="p-6 text-red-400 bg-red-500/10 rounded-lg">
        Error loading blog
      </p>
    );

  return (
    <article className="p-8 space-y-8 max-w-5xl mx-auto">

      {/* COVER IMAGE */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          src={data!.coverImage}
          className="w-full h-[380px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* META */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-indigo-400">
          {data!.category.join(" • ")} ·{" "}
          {new Date(data!.date).toDateString()}
        </p>

        <h1 className="text-4xl font-bold leading-tight text-white">
          {data!.title}
        </h1>

        <p className="text-lg text-neutral-400 max-w-3xl">
          {data!.description}
        </p>
      </div>

      {/* CONTENT */}
      <div
        className="
          prose prose-invert prose-indigo
          max-w-none
          prose-headings:font-semibold
          prose-p:text-neutral-300
          prose-li:text-neutral-300
          prose-strong:text-white
          prose-a:text-indigo-400 hover:prose-a:text-indigo-300
        "
      >
        {data!.content}
      </div>
    </article>
  );
}
