import { useState } from "react";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import CreateBlog from "./components/CreateBlog";
import Header from "./components/Header";
import Footer from "./components/Footer";

const TAGS = ["Tech", "Finance", "Career", "Education"];

export default function App() {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
        {/* MAIN LAYOUT */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[360px_1fr]">
          
          {/* LEFT PANEL */}
          <aside className="border-b lg:border-b-0 lg:border-r border-white/10 bg-neutral-900/70 backdrop-blur-xl p-5 space-y-6 animate-in fade-in slide-in-from-left-6 duration-700">
            
            {/* HEADER */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Latest Articles
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                {new Date().toDateString()}
              </p>
            </div>

            {/* CREATE BLOG */}
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <CreateBlog />
            </div>

            {/* BLOG LIST */}
            <BlogList
              onSelect={setSelectedId}
              selectedTag={selectedTag}
            />
          </aside>

          {/* RIGHT PANEL */}
          <main className="relative overflow-y-auto">
            <div className="mx-auto max-w-5xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-700">

              {/* TITLE */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold animate-in fade-in slide-in-from-top-4 duration-700">
                  Blog App 
                </h1>
                <p className="text-sm text-neutral-400 mt-2">
                  Read • Learn • Grow
                </p>
              </div>

              {/* TAG FILTER */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {TAGS.map((tag) => {
                  const isActive = selectedTag === tag;

                  return (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTag(isActive ? null : tag)
                      }
                      className={`
                        px-3 py-1 text-xs rounded-full
                        border transition-all
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                        ${
                          isActive
                            ? "bg-indigo-500/20 border-indigo-400 text-indigo-400"
                            : "bg-neutral-800 border-white/10 text-neutral-300 hover:bg-indigo-500/20 hover:text-indigo-400"
                        }
                      `}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* BLOG DETAILS */}
              <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                <BlogDetails blogId={selectedId} />
              </div>

            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
