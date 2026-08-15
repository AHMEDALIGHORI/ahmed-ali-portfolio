/** Signal / Field style: Skiper-inspired micro-interactions adapted for editorial portfolio evidence. */
import { type AnchorHTMLAttributes, type CSSProperties, type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type FieldActionProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  magnetic?: boolean;
};

function motionIsAllowed() {
  return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches;
}

/**
 * Adapted interaction principle from the free Skiper UI animated-link registry component.
 * Source attribution: https://skiper-ui.com/ — free version requires attribution.
 */
export function FieldAction({ children, className, magnetic = false, onMouseMove, onMouseLeave, ...props }: FieldActionProps) {
  const actionRef = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(event);
    if (!actionRef.current || !motionIsAllowed()) return;
    const bounds = actionRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
    if (magnetic) {
      actionRef.current.style.setProperty("--magnetic-x", `${offsetX * 7}px`);
      actionRef.current.style.setProperty("--magnetic-y", `${offsetY * 7}px`);
    }
    actionRef.current.style.setProperty("--plate-rx", `${offsetY * -3.5}deg`);
    actionRef.current.style.setProperty("--plate-ry", `${offsetX * 4}deg`);
  };

  const handleLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(event);
    if (!actionRef.current) return;
    actionRef.current.style.setProperty("--magnetic-x", "0px");
    actionRef.current.style.setProperty("--magnetic-y", "0px");
    actionRef.current.style.setProperty("--plate-rx", "0deg");
    actionRef.current.style.setProperty("--plate-ry", "0deg");
  };

  return (
    <a
      ref={actionRef}
      className={cn("skiper-field-action", magnetic && "skiper-magnetic", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ "--magnetic-x": "0px", "--magnetic-y": "0px", "--plate-rx": "0deg", "--plate-ry": "0deg" } as CSSProperties}
      {...props}
    >
      {children}
    </a>
  );
}
