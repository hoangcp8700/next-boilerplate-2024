import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const useWarnIfUnsavedChanges = (isDirty: boolean) => {
  const router = useRouter();

  const handleAnchorClick = (e: Event) => {
    const mouseEvent = e as MouseEvent; // Explicitly cast to MouseEvent
    if (mouseEvent.button !== 0) return; // only handle left-clicks

    const targetUrl = (mouseEvent.currentTarget as HTMLAnchorElement)?.href;
    const currentUrl = window.location.href;

    if (targetUrl && targetUrl !== currentUrl && window.onbeforeunload) {
      const res = window.onbeforeunload(mouseEvent as any);
      if (!res) mouseEvent.preventDefault();
    }
  };
  const addAnchorListeners = () => {
    const anchorElements = document.querySelectorAll('a[href]');
    anchorElements.forEach((anchor) =>
      anchor.addEventListener('click', handleAnchorClick),
    );
  };

  useEffect(() => {
    const mutationObserver = new MutationObserver(addAnchorListeners);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    addAnchorListeners();

    return () => {
      mutationObserver.disconnect();
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) =>
        anchor.removeEventListener('click', handleAnchorClick),
      );
    };
  }, []);

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        '(B) You have unsaved changes. Are you sure you want to leave?';
    };

    const handlePopState = (e: PopStateEvent) => {
      if (isDirty) {
        const confirmLeave = window.confirm(
          '(P) You have unsaved changes. Are you sure you want to leave?',
        );
        if (!confirmLeave) {
          e.preventDefault();
          window.history.pushState(null, '', window.location.href);
        }
      }
    };

    if (isDirty) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty]);

  useEffect(() => {
    const originalPush = router.push;
    router.push = async (url: string, options?: NavigateOptions) => {
      if (isDirty) {
        const confirmLeave = window.confirm(
          '(R) You have unsaved changes. Are you sure you want to leave?',
        );
        if (!confirmLeave) {
          return; // Cancel navigation if the user decides to stay
        }
      }

      // Proceed with navigation
      return originalPush(url, options);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router, isDirty]);
};

export default useWarnIfUnsavedChanges;
