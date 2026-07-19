"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouteLoading } from "@/hooks/useRouteLoading";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, setLoading } = useRouteLoading();
  const routeKey = `${pathname}?${searchParams.toString()}`;

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

      if (
        nextUrl.pathname === "/search" ||
        nextUrl.pathname.startsWith("/property/")
      ) {
        return;
      }

      const currentUrl = new URL(window.location.href);

      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search
      ) {
        return;
      }

      setLoading(true);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [setLoading]);

  useEffect(() => {
    setLoading(false);
  }, [routeKey, setLoading]);

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/10 px-6 pt-[calc(env(safe-area-inset-top)+48px)] backdrop-blur-[2px]">
      <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-5 py-3 text-sm font-medium text-[#0B1F3A] shadow-sm">
        <span className="h-5 w-5 rounded-full border-2 border-[#0B1F3A]/25 border-t-[#0B1F3A] animate-spin" />
        Preparing your page
      </div>
    </div>
  );
}
