"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { useStrictEffect } from "./use-strict-effect";

export function useRect(
  element: Element | null | undefined,
  enabled = true
): DOMRect {
  const rerender = useReducer(() => ({}), [])[1];

  const rectRef = useRef<DOMRect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  } as DOMRect);

  const measure = useCallback(() => {
    if (element) {
      rectRef.current = element.getBoundingClientRect();
    }
  }, [element]);

  useEffect(() => {
    if (!element || !enabled) {
      return;
    }

    const cb = () => {
      measure();
      rerender();
    };

    document.addEventListener("scroll", cb, true);

    return () => {
      document.removeEventListener("scroll", cb, true);
    };
  }, [element, enabled, measure, rerender]);

  useStrictEffect(() => {
    if (!element || !enabled) {
      return;
    }

    measure();
    rerender();

    const observer = new ResizeObserver(() => {
      measure();
      rerender();
    });

    observer.observe(element as Element);

    return () => {
      observer.unobserve(element as Element);
    };
  }, [element, enabled, measure, rerender]);

  return rectRef.current;
}
