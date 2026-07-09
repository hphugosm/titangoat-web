export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-navy/60 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <span className="text-lg font-extrabold">
          Titan<span className="text-frost">GOAT</span>
        </span>
        <nav className="flex gap-8 text-sm text-white/50">
          <a href="#produkt" className="transition hover:text-frost">
            Produkt
          </a>
          <a href="#slozeni" className="transition hover:text-frost">
            Složení
          </a>
          <a href="#koupit" className="transition hover:text-frost">
            Kontakt
          </a>
        </nav>
        <div className="flex gap-5 text-sm text-white/50">
          <a href="#" aria-label="TikTok" className="transition hover:text-frost">
            TikTok
          </a>
          <a href="#" aria-label="Instagram" className="transition hover:text-frost">
            Instagram
          </a>
        </div>
      </div>
      <p className="mt-10 text-center font-mono text-xs text-white/30">
        © 2026 TitanGOAT · #PushYourLimits · ukázková stránka – demo obsah
      </p>
    </footer>
  );
}
