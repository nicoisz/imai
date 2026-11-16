"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

/** Movimiento minimo que cuenta como intencion de scroll. */
const UMBRAL = 8;
/** Por encima de esto la barra siempre se muestra. */
const ZONA_SUPERIOR = 90;

const idPanel = (label: string) =>
  "menu-" +
  label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z]/g, "");

function Chevron({ abierto }: { abierto: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn(
        "h-3 w-3 transition-transform duration-300",
        abierto && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="m3 4.75 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Flecha() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        d="M3.2 8.8 8.8 3.2M4.4 3.2h4.4v4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <a
      href="#inicio"
      className="flex items-center gap-2"
      aria-label={SITE.name + " — inicio"}
    >
      <span className="font-serif text-[19px] leading-none tracking-[-0.04em]">
        {SITE.name}
      </span>
      <span className="bg-lime-deep mt-[2px] h-[5px] w-[5px] rounded-full" />
    </a>
  );
}

export function Header() {
  /** Label del desplegable abierto, o null. */
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movil, setMovil] = useState(false);
  const [oculto, setOculto] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const disparadores = useRef(new Map<string, HTMLButtonElement | null>());

  const algoAbierto = abierto !== null || movil;

  const cerrarTodo = () => {
    setAbierto(null);
    setMovil(false);
  };

  // Se esconde al bajar y reaparece al subir. Con un menu abierto, no.
  useEffect(() => {
    if (algoAbierto) return;
    let anterior = window.scrollY;

    const apply = () => {
      const y = window.scrollY;
      const delta = y - anterior;
      if (y < ZONA_SUPERIOR) {
        anterior = y;
        setOculto(false);
        return;
      }
      if (Math.abs(delta) < UMBRAL) return;
      anterior = y;
      setOculto(delta > 0);
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    return () => window.removeEventListener("scroll", apply);
  }, [algoAbierto]);

  useEffect(() => {
    if (algoAbierto) setOculto(false);
  }, [algoAbierto]);

  // Escape cierra y devuelve el foco al disparador.
  useEffect(() => {
    if (!algoAbierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const foco = abierto ? disparadores.current.get(abierto) : null;
      cerrarTodo();
      foco?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [algoAbierto, abierto]);

  // Clic fuera del header.
  useEffect(() => {
    if (!algoAbierto) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) cerrarTodo();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [algoAbierto]);

  // El foco sale del header (Tab hasta el final) -> cerrar.
  useEffect(() => {
    if (!algoAbierto) return;
    const onFocus = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) cerrarTodo();
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [algoAbierto]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-300 ease-out motion-reduce:transition-none",
        oculto && "-translate-y-full",
      )}
    >
      <div className="site">
        <div className="header-pill overflow-hidden rounded-2xl">
          <div className="flex h-14 items-center justify-between gap-6 px-4 md:px-5">
            <Wordmark />

            <nav
              className="hidden items-center gap-7 md:flex"
              aria-label="Principal"
            >
              {NAV.map((entry) =>
                entry.menu ? (
                  <button
                    key={entry.label}
                    type="button"
                    ref={(el) => {
                      disparadores.current.set(entry.label, el);
                    }}
                    aria-haspopup="true"
                    aria-expanded={abierto === entry.label}
                    aria-controls={idPanel(entry.label)}
                    onClick={() =>
                      setAbierto((v) =>
                        v === entry.label ? null : entry.label,
                      )
                    }
                    className="nav-link gap-1 text-[15px] opacity-75 transition-opacity hover:opacity-100 aria-expanded:opacity-100"
                  >
                    {entry.label}
                    <Chevron abierto={abierto === entry.label} />
                  </button>
                ) : (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={cerrarTodo}
                    className="nav-link text-[15px] opacity-75 transition-opacity hover:opacity-100"
                  >
                    {entry.label}
                  </a>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contacto"
                onClick={cerrarTodo}
                className="header-cta hidden rounded-full px-4 py-2 text-[13px] font-medium sm:inline-flex"
              >
                Hablemos
              </a>
              <button
                type="button"
                onClick={() => {
                  setAbierto(null);
                  setMovil((v) => !v);
                }}
                aria-expanded={movil}
                aria-controls="menu-movil"
                aria-label={movil ? "Cerrar menú" : "Abrir menú"}
                className="grid h-9 w-9 place-items-center rounded-full border border-current/20 md:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300",
                      movil ? "top-[5px] rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300",
                      movil ? "top-[5px] -rotate-45" : "top-[10px]",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Desplegables de escritorio: el pill crece para revelarlos. */}
          {NAV.filter((e) => e.menu).map((entry) => {
            const activo = abierto === entry.label;
            const menu = entry.menu!;
            return (
              <div
                key={entry.label}
                id={idPanel(entry.label)}
                className={cn(
                  "hidden transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.83,0,0.17,1)] motion-reduce:transition-none md:grid",
                  activo ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div
                  className={cn(
                    "min-h-0 overflow-hidden",
                    !activo && "invisible",
                  )}
                  aria-hidden={!activo}
                >
                  <div className="border-t border-current/10 px-5 pt-5 pb-7 md:px-6">
                    <p className="eyebrow opacity-45">{menu.eyebrow}</p>

                    <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
                      <div className="grid gap-x-10 sm:grid-cols-2">
                        {menu.links.map((link) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.href}
                              href={link.href}
                              onClick={cerrarTodo}
                              className="group flex items-start gap-3 border-b border-current/10 py-3.5"
                            >
                              <span className="group-hover:bg-lime-deep group-hover:text-olive mt-[2px] grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-current/15 transition-colors duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover:border-transparent">
                                <Icon
                                  size={15}
                                  strokeWidth={1.6}
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[14px] font-medium">
                                  {link.label}
                                </span>
                                <span className="mt-1 line-clamp-2 block text-[12.5px] leading-snug opacity-55">
                                  {link.description}
                                </span>
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      <a
                        href={menu.feature.cta.href}
                        onClick={cerrarTodo}
                        className="flex flex-col justify-between gap-6 rounded-2xl border border-current/12 p-5 transition-colors hover:border-current/30"
                      >
                        <span>
                          <span className="block text-[14px] font-medium">
                            {menu.feature.title}
                          </span>
                          <span className="mt-2 block text-[12.5px] leading-snug opacity-55">
                            {menu.feature.description}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2 text-[13px] font-medium">
                          {menu.feature.cta.label}
                          <Flecha />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Menu movil: mismas entradas, desplegables en acordeon. */}
          <div
            id="menu-movil"
            className={cn(
              "grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.83,0,0.17,1)] motion-reduce:transition-none md:hidden",
              movil ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div
              className={cn("min-h-0 overflow-hidden", !movil && "invisible")}
              aria-hidden={!movil}
            >
              <nav
                className="flex flex-col border-t border-current/10 px-4 py-3"
                aria-label="Menú móvil"
              >
                {NAV.map((entry) => {
                  if (!entry.menu) {
                    return (
                      <a
                        key={entry.label}
                        href={entry.href}
                        onClick={cerrarTodo}
                        className="border-b border-current/10 py-3 font-serif text-2xl tracking-[-0.03em]"
                      >
                        {entry.label}
                      </a>
                    );
                  }

                  const activo = abierto === entry.label;
                  return (
                    <div
                      key={entry.label}
                      className="border-b border-current/10"
                    >
                      <button
                        type="button"
                        aria-expanded={activo}
                        aria-controls={idPanel(entry.label) + "-movil"}
                        onClick={() =>
                          setAbierto((v) =>
                            v === entry.label ? null : entry.label,
                          )
                        }
                        className="flex w-full items-center justify-between py-3 text-left font-serif text-2xl tracking-[-0.03em]"
                      >
                        {entry.label}
                        <Chevron abierto={activo} />
                      </button>

                      <div
                        id={idPanel(entry.label) + "-movil"}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.83,0,0.17,1)]",
                          activo ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div
                          className={cn(
                            "min-h-0 overflow-hidden",
                            !activo && "invisible",
                          )}
                          aria-hidden={!activo}
                        >
                          <div className="flex flex-col gap-1 pb-3 pl-1">
                            {entry.menu.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                onClick={cerrarTodo}
                                className="py-2 text-[15px] opacity-75"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <a
                  href="#contacto"
                  onClick={cerrarTodo}
                  className="header-cta mt-4 inline-flex justify-center rounded-full px-5 py-3 text-sm font-medium"
                >
                  Hablemos
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
