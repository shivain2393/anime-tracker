const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          © {new Date().getFullYear()} AnimeTracker. All anime data is for
          demonstration purposes only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
