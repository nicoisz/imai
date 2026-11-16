import { FOOTER_COLUMNS, SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="light" className="relative overflow-hidden">
      <div className="site">
        <div className="grid gap-12 border-t border-ink/10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-20 md:py-20">
          <div>
            <h2 className="display-md max-w-[14ch] text-ink">
              Hablemos de lo que quieres construir
            </h2>
            <a
              href={"mailto:" + SITE.email}
              className="mt-7 inline-block border-b border-ink/25 pb-1 font-sans text-[17px] text-ink transition-colors hover:border-ink"
            >
              {SITE.email}
            </a>
            <p className="mt-6 text-[13px] text-ink/65">{SITE.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[13px] font-medium text-ink/65">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={column.title + link.href}>
                      <a
                        href={link.href}
                        className="text-[14px] text-ink/75 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 py-6 text-[12px] text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"\u00A9 " + year + " " + SITE.name + ". Todos los derechos reservados."}
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>

    </footer>
  );
}
