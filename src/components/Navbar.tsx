import Link from "next/link";
import ThemeToggler from "./ThemeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50 h-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between h-full">
        <Link href="/" className="text-2xl md:text-3xl font-bold">
          AniHubTracker
        </Link>
        {/* Search */}
        <div className="flex items-center md:gap-4">
          <Button variant='ghost' size='lg'><Link href='/about'>About</Link></Button>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
