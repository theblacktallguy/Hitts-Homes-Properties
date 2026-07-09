"use client";

import { useEffect } from "react";

export default function OverscrollLock() {
  useEffect(() => {
    const el = document.querySelector(".scroll-container") as HTMLElement;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
        el.style.overflowY = "hidden";
        setTimeout(() => {
          el.style.overflowY = "auto";
        }, 300);
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}