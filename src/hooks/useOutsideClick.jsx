import { useEffect, useRef } from "react";

/**
 * useOutsideClick(refOrRefs, handler)
 * - refOrRefs: single ref OR array of refs (each ref should be created with useRef)
 * - handler: function to call when a click/touch happens outside all provided refs
 */
export default function useOutsideClick(refOrRefs, handler) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];

    function onPointer(e) {
      const clickedInside = refs.some((ref) => {
        const element = ref && ref.current;
        return element && element.contains(e.target);
      });

      if (!clickedInside) {
        handlerRef.current(e);
      }
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [refOrRefs]);
}
