import { useEffect, useRef, useState } from 'react';

export function useRefreshOnOpen(callback: () => void, throttleMs = 30000) {
  const lastCallRef = useRef<number>(0);
  const hiddenTimeRef = useRef<number>(0);

  useEffect(() => {
    const trigger = (force = false) => {
      const now = Date.now();
      if (force || now - lastCallRef.current >= throttleMs) {
        lastCallRef.current = now;
        callback();
      }
    };

    // 1. On mount
    trigger(true);

    // 2. visibilitychange
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeHidden = Date.now() - hiddenTimeRef.current;
        const force = timeHidden > 300000; // > 5 min hidden
        trigger(force);
      } else {
        hiddenTimeRef.current = Date.now();
      }
    };

    // 3. focus
    const onFocus = () => trigger();

    // 4. pageshow (bfcache)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) trigger(true);
      else trigger();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [callback, throttleMs]);
}
