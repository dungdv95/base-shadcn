import { useRef, useState } from "react";
import { useEventListener } from "@/hooks/use-event-listener";

interface Params {
  delay?: number;
  onMouseLeave?: Function;
  onMouseEnter?: Function;
}

const defaultValue = {
  delay: 0
};

export function useMouseHoverEvent(params: Params = defaultValue) {
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    params.onMouseEnter && params.onMouseEnter();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      params.onMouseLeave && params.onMouseLeave();
    }, params.delay);
  };

  useEventListener("mouseenter", handleMouseEnter, elementRef);
  useEventListener("mouseleave", handleMouseLeave, elementRef);

  return elementRef;
}
