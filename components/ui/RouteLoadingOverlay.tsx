"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouteLoading } from "@/hooks/useRouteLoading";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, setLoading } = useRouteLoading();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link) return;

      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const nextUrl = new URL(link.href, window.location.href);

      if (nextUrl.origin !== window.location.origin) return;

      const currentUrl = new URL(window.location.href);

      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search
      ) {
        return;
      }

      setLoading(true);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setLoading]);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams, setLoading]);

  useEffect(() => {
    if (!loading) return;

    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loading, setLoading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 px-6 pt-[calc(env(safe-area-inset-top)+48px)] backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F3A] shadow-xl">
        <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </div>

      <p className="mt-6 text-center text-lg font-semibold text-[#0B1F3A]">
        Loading your next page
      </p>

      <div className="mt-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#C8A45D] animate-bounce" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:150ms]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
