export default function Header() {
  return (
     <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-white">
          CA Monk Blog
        </h1>

        <nav className="flex items-center gap-6 text-sm text-neutral-400">
          <span className="hover:text-white cursor-pointer">Tools</span>
          <span className="hover:text-white cursor-pointer">Practice</span>
          <span className="hover:text-white cursor-pointer">Events</span>
          <span className="hover:text-white cursor-pointer">Job Board</span>
        </nav>

        <button className="rounded-lg bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-400 transition">
          Profile
        </button>
      </div>
    </header>
  );
}
