"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";

import { sectionIds } from "@/config/site";

/**
 * Connects "Obvesti me ob dostopnosti" buttons with the notification form
 * on the same page: clicking a product CTA scrolls to the form (native
 * anchor), preselects that product and moves focus to the first field.
 */
type NotifyContextValue = {
  productInterest: string;
  setProductInterest: (value: string) => void;
  /** Incremented on every CTA click so the form can react (e.g. leave the success state). */
  requestId: number;
  requestNotify: (productSlug?: string) => void;
  formRef: RefObject<HTMLFormElement | null>;
  /** id of the notification section on this page (anchor fallback without JavaScript). */
  sectionId: string;
};

const NotifyContext = createContext<NotifyContextValue | null>(null);

export function NotifyProvider({
  initialProduct = "",
  sectionId = sectionIds.notify,
  children,
}: {
  initialProduct?: string;
  sectionId?: string;
  children: ReactNode;
}) {
  const [productInterest, setProductInterest] = useState(initialProduct);
  const [requestId, setRequestId] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);

  const requestNotify = useCallback((productSlug?: string) => {
    if (productSlug) setProductInterest(productSlug);
    setRequestId((id) => id + 1);

    // After React commits (the form may re-render from its success state),
    // scroll to this page's own form and focus its first field. A scoped ref
    // is used instead of the URL hash because routes kept alive by
    // Cache Components (<Activity>) can leave hidden duplicates of an id.
    requestAnimationFrame(() => {
      const form = formRef.current;
      if (!form) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      (form.closest("section") ?? form).scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      form
        .querySelector<HTMLElement>("input:not([tabindex='-1']), select, textarea")
        ?.focus({ preventScroll: true });
    });
  }, []);

  const value = useMemo(
    () => ({ productInterest, setProductInterest, requestId, requestNotify, formRef, sectionId }),
    [productInterest, requestId, requestNotify, sectionId],
  );

  return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
}

export function useNotify(): NotifyContextValue {
  const context = useContext(NotifyContext);
  if (!context) throw new Error("useNotify must be used inside <NotifyProvider>.");
  return context;
}

type NotifyLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  productSlug?: string;
};

/**
 * In-page link to the notification form that preselects a product.
 * Works as a plain anchor without JavaScript.
 */
export function NotifyLink({ productSlug, onClick, children, ...props }: NotifyLinkProps) {
  const { requestNotify, sectionId } = useNotify();

  return (
    <a
      href={`#${sectionId}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        requestNotify(productSlug);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
