import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SERVICES, SOCIAL_LINKS, SITE } from "@/data/site";
import { StarMark } from "@/components/ui/StarIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="relative scroll-mt-20 border-t border-border bg-background-secondary"
    >
      <div className="container-editorial py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Imai"
            >
              <span className="text-primary-bright">
                <StarMark className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl tracking-[-0.02em]">
                imai
              </span>
            </Link>
            <p className="mt-6 max-w-[34ch] font-serif text-2xl leading-snug text-foreground-soft sm:text-[1.75rem]">
              Inspirados por las estrellas,
              <br />
              construimos el futuro.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary-bright"
            >
              {SITE.email}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <FooterCol title="Navegación">
              {NAV_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Servicios">
              {SERVICES.map((s) => (
                <FooterLink key={s.id} href={s.href}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Conectar">
              {SOCIAL_LINKS.map((s) => (
                <FooterLink key={s.label} href={s.href} external>
                  {s.label}
                </FooterLink>
              ))}
              <FooterLink href={`mailto:${SITE.email}`}>Correo</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-border" />

        <div className="mt-6 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            © {year} Imai · {SITE.location}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            {SITE.coordinates}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
        {title}
      </p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="group inline-flex items-center gap-1.5 text-sm text-foreground-soft transition-colors hover:text-primary-bright"
      >
        {children}
        {external && (
          <ArrowUpRight
            className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
            strokeWidth={1.5}
          />
        )}
      </Link>
    </li>
  );
}
