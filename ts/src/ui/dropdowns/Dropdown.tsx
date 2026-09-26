import { memo, useCallback, useEffect, useRef } from "react";

import useDropdownStore from "./dropdownStore";

export type DropdownProps = {
  id: string | number;
  hideOnScroll?: boolean;
};

const Dropdown = memo(({ id, hideOnScroll }: DropdownProps) => {
  const {
    id: activeId,
    trigger,
    left,
    top,
    setPosition,
    hide,
    renderContent,
  } = useDropdownStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (ev: MouseEvent) => {
      const triggerRect = trigger?.getBoundingClientRect();

      if (triggerRect) {
        if (
          ev.clientX >= triggerRect.left &&
          ev.clientX <= triggerRect.right &&
          ev.clientY >= triggerRect.top &&
          ev.clientY <= triggerRect.bottom
        ) {
          return;
        }
      }

      hide({ id });
    },
    [hide, id, trigger]
  );

  useEffect(() => {
    if (id !== activeId) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    const triggerRect = trigger?.getBoundingClientRect();

    if (containerRect && triggerRect) {
      const docRect = document.documentElement.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;

      if (containerRect.bottom > docRect.height) {
        const top = scrollTop + triggerRect.top - containerRect.height;

        setPosition({ id, top });
      }
    }
  }, [trigger, top, setPosition, activeId, id]);

  useEffect(() => {
    if (id !== activeId) return;

    document.addEventListener("click", onOutsideClick);

    return () => {
      document.removeEventListener("click", onOutsideClick);
    };
  }, [id, activeId, hide, onOutsideClick]);

  useEffect(() => {
    if (id !== activeId || !hideOnScroll) return;

    const onScroll = () => {
      hide({ id });
    };

    document.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [hide, hideOnScroll, id, activeId]);

  if (id !== activeId) return null;

  return (
    <div ref={containerRef} style={{ left, top }}>
      {renderContent?.()}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
