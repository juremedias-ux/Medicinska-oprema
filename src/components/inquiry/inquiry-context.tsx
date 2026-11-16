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
import type { InquiryType, RequesterType } from "@/lib/forms";
import { revealSection } from "@/lib/scroll";

export type InquiryPreset = {
  inquiryType?: InquiryType;
  productSlug?: string;
  technology?: string;
  requesterType?: RequesterType;
};

type InquiryContextValue = {
  preset: InquiryPreset;
  /** Incremented on every CTA click so the form can apply the preset. */
  requestId: number;
  requestInquiry: (preset?: InquiryPreset) => void;
  formRef: RefObject<HTMLFormElement | null>;
  sectionId: string;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({
  initialPreset = {},
  sectionId = sectionIds.inquiry,
  children,
}: {
  initialPreset?: InquiryPreset;
  sectionId?: string;
  children: ReactNode;
}) {
  const [preset, setPreset] = useState<InquiryPreset>(initialPreset);
  const [requestId, setRequestId] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);

  const requestInquiry = useCallback((next: InquiryPreset = {}) => {
    setPreset(next);
    setRequestId((id) => id + 1);
    // After React commits the preset, scroll to this page's form and focus it.
    requestAnimationFrame(() => {
      const form = formRef.current;
      if (!form) return;
      revealSection(
        form.closest("section") ?? form,
        form.querySelector<HTMLElement>("input:not([type='hidden']):not([tabindex='-1']), select, textarea"),
      );
    });
  }, []);

  const value = useMemo(
    () => ({ preset, requestId, requestInquiry, formRef, sectionId }),
    [preset, requestId, requestInquiry, sectionId],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry(): InquiryContextValue {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used inside <InquiryProvider>.");
  return context;
}

type InquiryLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  preset?: InquiryPreset;
  children: ReactNode;
};

/** CTA that opens the inquiry form with a preset (product, technology, requester type). */
export function InquiryLink({ preset, onClick, children, ...props }: InquiryLinkProps) {
  const { requestInquiry, sectionId } = useInquiry();
  return (
    <a
      href={`#${sectionId}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        requestInquiry(preset);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
