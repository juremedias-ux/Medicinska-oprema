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
import { getNeed } from "@/lib/explorer";
import { revealSection } from "@/lib/scroll";
import type { NeedType } from "@/types/technology";

type ExplorerContextValue = {
  tab: NeedType;
  setTab: (tab: NeedType) => void;
  selectedNeedId: string | null;
  selectNeed: (needId: string | null) => void;
  /** Select a need (or open a tab) and bring the explorer into view. */
  openExplorer: (options: { needId?: string; tab?: NeedType }) => void;
  sectionRef: RefObject<HTMLElement | null>;
  resultsRef: RefObject<HTMLDivElement | null>;
};

const ExplorerContext = createContext<ExplorerContextValue | null>(null);

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<NeedType>("predel");
  const [selectedNeedId, setSelectedNeedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const selectNeed = useCallback((needId: string | null) => {
    setSelectedNeedId(needId);
    const need = needId ? getNeed(needId) : undefined;
    if (need) setTab(need.type);
  }, []);

  const openExplorer = useCallback(
    ({ needId, tab: nextTab }: { needId?: string; tab?: NeedType }) => {
      if (needId) selectNeed(needId);
      else if (nextTab) setTab(nextTab);
      // With a need selected on narrow screens, go straight to the results.
      const narrow = window.matchMedia("(max-width: 1023px)").matches;
      requestAnimationFrame(() =>
        needId && narrow
          ? revealSection(resultsRef.current, resultsRef.current)
          : revealSection(sectionRef.current),
      );
    },
    [selectNeed],
  );

  const value = useMemo(
    () => ({ tab, setTab, selectedNeedId, selectNeed, openExplorer, sectionRef, resultsRef }),
    [tab, selectedNeedId, selectNeed, openExplorer],
  );

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
}

export function useExplorer(): ExplorerContextValue {
  const context = useContext(ExplorerContext);
  if (!context) throw new Error("useExplorer must be used inside <ExplorerProvider>.");
  return context;
}

type ExplorerLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  needId?: string;
  tab?: NeedType;
  children: ReactNode;
};

/** Link into the explorer that preselects a need or tab. Plain anchor without JavaScript. */
export function ExplorerLink({ needId, tab, onClick, children, ...props }: ExplorerLinkProps) {
  const { openExplorer } = useExplorer();
  return (
    <a
      href={`#${sectionIds.explorer}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        openExplorer({ needId, tab });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
