import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(threshold = 0.1, once = true) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { 
        threshold,
        rootMargin: "-50px 0px -50px 0px"
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
};
