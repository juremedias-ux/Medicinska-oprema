"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui/button";
import { BellIcon, CloseIcon, MailIcon, MenuIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { mainNav, notifyCtaLabel, sectionIds, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";

const SCROLL_THRESHOLD = 8;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useHasScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
}

export function SiteHeader() {
  const hasScrolled = useHasScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const notifyHref = `/#${sectionIds.notify}`;
  const isSolid = hasScrolled || isMenuOpen;

  // Mobile menu: lock page scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!isMenuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  // Close the mobile menu when the viewport grows to the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        isSolid
          ? "border-ink-200/70 bg-white/95 shadow-[0_8px_30px_-20px_rgb(11_27_43/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.9375rem] font-medium text-ink-600 transition-colors duration-200 hover:bg-ink-100/70 hover:text-ink-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={notifyHref} className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
            <BellIcon />
            {notifyCtaLabel}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-100 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
            aria-label={isMenuOpen ? "Zapri meni" : "Odpri meni"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 bg-ink-950/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id={panelId}
        ref={panelRef}
        inert={!isMenuOpen}
        className={cn(
          "absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-ink-200/70 bg-white shadow-lift transition-[opacity,transform,visibility] duration-300 ease-out-quart lg:hidden",
          isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <Container className="pt-4 pb-8">
          <nav aria-label="Mobilna navigacija">
            <ul className="divide-y divide-ink-100">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between py-4 text-xl font-medium tracking-tight text-ink-950"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-ink-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={notifyHref}
            onClick={closeMenu}
            className={cn(buttonVariants({ size: "lg", fullWidth: true }), "mt-6")}
          >
            <BellIcon />
            {notifyCtaLabel}
          </Link>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-600"
          >
            <MailIcon className="size-4" />
            {siteConfig.contact.email}
          </a>
        </Container>
      </div>
    </header>
  );
}
