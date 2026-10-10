"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import {
  buildServices,
  growFeatured,
  growServices,
  headerCta,
  homepageHashIds,
  isCareersNavActive,
  isGrowNavActive,
  isServicesNavActive,
  primaryNav,
} from "@/content/navigation";

type OpenMenu = "services" | "grow" | null;

function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const read = () => setHash(window.location.hash || "#home");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return hash;
}

export function Header() {
  const pathname = usePathname() || "/";
  const hash = useHash();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileAccordion, setMobileAccordion] = useState<"services" | "grow" | null>(null);
  const [activeHash, setActiveHash] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesMenuId = useId();
  const growMenuId = useId();

  const closeMenus = useCallback(() => setOpenMenu(null), []);

  const openWithDelay = (menu: OpenMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (pathname !== "/") return;
      let current = "#home";
      for (const id of homepageHashIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          if (
            id === "website-development" ||
            id === "landing-pages" ||
            id === "ecommerce"
          ) {
            current = "#services";
          } else {
            current = `#${id}`;
          }
        }
      }
      setActiveHash(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const growActive = isGrowNavActive(pathname);
  const servicesActive = isServicesNavActive(pathname, activeHash || hash);
  const isHome = pathname === "/";

  const linkActive = (item: (typeof primaryNav)[number]) => {
    if (item.kind === "grow") return growActive;
    if (item.kind === "services") return servicesActive;
    if (item.kind === "route") {
      if (item.href === "/careers") return isCareersNavActive(pathname);
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }
    if (!isHome) return false;
    return activeHash === item.hash;
  };

  const navItemClass = (active: boolean) =>
    cn(
      "nav-link relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-medium transition-all duration-200 focus-ring xl:px-3 xl:text-[13px]",
      active
        ? "bg-lavender text-purple-deep shadow-[0_0_18px_-4px_rgba(109,40,217,0.45)]"
        : "text-muted hover:text-purple-deep",
    );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-soft-border/70 bg-warm-ivory/85 shadow-[0_10px_36px_rgba(65,42,66,0.1)] backdrop-blur-xl"
          : "border-b border-transparent bg-warm-ivory/55 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo interactive />

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Κύρια πλοήγηση"
        >
          {primaryNav.map((item) => {
            if (item.kind === "services" || item.kind === "grow") {
              const isOpen = openMenu === item.kind;
              const menuId = item.kind === "services" ? servicesMenuId : growMenuId;
              const active = linkActive(item) || isOpen;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openWithDelay(item.kind)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className={navItemClass(active)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    aria-current={linkActive(item) ? "page" : undefined}
                    onClick={() => setOpenMenu(isOpen ? null : item.kind)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>

                  <div
                    id={menuId}
                    role="menu"
                    className={cn(
                      "absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,22rem)] -translate-x-1/2 rounded-2xl border border-soft-border bg-warm-ivory/95 p-3 shadow-[0_24px_60px_-28px_rgba(65,42,66,0.28)] backdrop-blur-xl transition-[opacity,transform] duration-200",
                      item.kind === "grow" && "w-[min(92vw,34rem)]",
                      isOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                      "motion-reduce:transition-none",
                    )}
                    onMouseEnter={() => openWithDelay(item.kind)}
                    onMouseLeave={scheduleClose}
                  >
                    {item.kind === "services" ? (
                      <div>
                        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-purple-primary">
                          Υπηρεσίες
                        </p>
                        <ul className="space-y-1">
                          {buildServices.map((svc) => (
                            <li key={svc.href}>
                              <a
                                href={svc.href}
                                role="menuitem"
                                className="block rounded-xl px-3 py-2.5 transition hover:bg-lavender focus-ring"
                                onClick={closeMenus}
                              >
                                <span className="block text-sm font-semibold text-warm-charcoal">
                                  {svc.label}
                                </span>
                                {svc.description ? (
                                  <span className="mt-0.5 block text-xs text-muted">
                                    {svc.description}
                                  </span>
                                ) : null}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                        <div>
                          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-purple-primary">
                            Grow Your Business
                          </p>
                          <ul className="grid gap-1 sm:grid-cols-2">
                            {growServices.map((svc) => (
                              <li key={svc.href}>
                                <Link
                                  href={svc.href}
                                  role="menuitem"
                                  className="block rounded-xl px-3 py-2.5 transition hover:bg-lavender focus-ring"
                                  onClick={closeMenus}
                                >
                                  <span className="block text-sm font-semibold text-warm-charcoal">
                                    {svc.label}
                                  </span>
                                  {svc.description ? (
                                    <span className="mt-0.5 block text-[11px] leading-snug text-muted">
                                      {svc.description}
                                    </span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/grow-your-business"
                            className="mt-2 inline-flex px-3 py-2 text-xs font-semibold text-purple-deep underline-offset-2 hover:underline focus-ring rounded"
                            onClick={closeMenus}
                          >
                            Όλες οι υπηρεσίες →
                          </Link>
                        </div>
                        <Link
                          href={growFeatured.href}
                          role="menuitem"
                          onClick={closeMenus}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-purple-primary/40 bg-gradient-to-b from-lavender via-warm-ivory to-soft-cream p-4 shadow-[0_18px_40px_-28px_rgba(109,40,217,0.45)] transition hover:-translate-y-0.5 focus-ring"
                        >
                          <div>
                            <span className="inline-flex rounded-full bg-purple-deep px-2 py-0.5 text-[10px] font-bold text-white">
                              {growFeatured.badge}
                            </span>
                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-purple-primary">
                              NEXUS GROWTH
                            </p>
                            <p className="mt-1 text-base font-extrabold text-warm-charcoal">
                              {growFeatured.label}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-muted">
                              {growFeatured.description}
                            </p>
                            <p className="mt-3 text-xl font-extrabold text-purple-deep">
                              {growFeatured.price}
                            </p>
                          </div>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-deep">
                            {growFeatured.cta}
                            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            const active = linkActive(item);
            if (item.kind === "route") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navItemClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <a
                key={item.href}
                href={item.href}
                className={navItemClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={headerCta.href}
            className="cta-glow hidden items-center gap-2 rounded-full bg-gradient-to-br from-purple-primary to-purple-bright px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 focus-ring sm:inline-flex lg:px-5"
          >
            {headerCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-soft-border bg-warm-ivory text-purple-deep focus-ring lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-soft-border bg-warm-ivory lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {primaryNav.map((item) => {
            if (item.kind === "services" || item.kind === "grow") {
              const expanded = mobileAccordion === item.kind;
              const panelId = `mobile-${item.kind}`;
              return (
                <div key={item.label} className="rounded-xl">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-warm-charcoal hover:bg-lavender focus-ring"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() =>
                      setMobileAccordion((curr) => (curr === item.kind ? null : item.kind))
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-purple-primary transition-transform duration-200",
                        expanded && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-1 px-2 pb-2">
                        {(item.kind === "services" ? buildServices : growServices).map((svc) =>
                          item.kind === "services" ? (
                            <a
                              key={svc.href}
                              href={svc.href}
                              className="block rounded-lg px-3 py-2.5 text-sm text-warm-charcoal hover:bg-lavender"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="font-semibold">{svc.label}</span>
                              {svc.description ? (
                                <span className="mt-0.5 block text-xs text-muted">
                                  {svc.description}
                                </span>
                              ) : null}
                            </a>
                          ) : (
                            <Link
                              key={svc.href}
                              href={svc.href}
                              className="block rounded-lg px-3 py-2.5 text-sm text-warm-charcoal hover:bg-lavender"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="font-semibold">{svc.label}</span>
                              {svc.description ? (
                                <span className="mt-0.5 block text-xs text-muted">
                                  {svc.description}
                                </span>
                              ) : null}
                            </Link>
                          ),
                        )}
                        {item.kind === "grow" ? (
                          <>
                            <Link
                              href="/grow-your-business"
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-purple-deep"
                              onClick={() => setMobileOpen(false)}
                            >
                              Όλες οι υπηρεσίες →
                            </Link>
                            <Link
                              href={growFeatured.href}
                              className="mt-1 block rounded-xl border border-purple-primary/30 bg-gradient-to-br from-lavender to-soft-cream px-3 py-3"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="inline-flex rounded-full bg-purple-deep px-2 py-0.5 text-[10px] font-bold text-white">
                                {growFeatured.badge}
                              </span>
                              <span className="mt-2 block font-extrabold text-warm-charcoal">
                                {growFeatured.label}
                              </span>
                              <span className="mt-1 block text-xs text-muted">
                                {growFeatured.description}
                              </span>
                              <span className="mt-2 block text-sm font-extrabold text-purple-deep">
                                {growFeatured.price}
                              </span>
                            </Link>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.kind === "route") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium hover:bg-lavender",
                    linkActive(item)
                      ? "bg-lavender text-purple-deep"
                      : "text-warm-charcoal",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-warm-charcoal hover:bg-lavender"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            );
          })}

          <Link
            href={headerCta.href}
            onClick={() => setMobileOpen(false)}
            className="cta-glow mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 font-semibold text-white"
          >
            {headerCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
