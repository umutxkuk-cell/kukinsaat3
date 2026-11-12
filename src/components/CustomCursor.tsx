import { useEffect, useRef, useState } from "react";

type CursorMode = "normal" | "interactive" | "view" | "text";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("kuk-cursor-enabled");

    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf = 0;
    let running = false;
    let idleTimer = 0;
    let mouseX = -100;
    let mouseY = -100;
    let frameX = -100;
    let frameY = -100;
    let dotX = -100;
    let dotY = -100;
    let pressed = false;
    let visible = false;
    let mode: CursorMode = "normal";
    let magneticElement: HTMLElement | null = null;
    let magneticInner: HTMLElement | null = null;
    let magneticTargetX = 0;
    let magneticTargetY = 0;
    let magneticX = 0;
    let magneticY = 0;

    const setMode = (next: CursorMode, label?: string) => {
      if (mode === next && next !== "view") return;
      mode = next;
      cursor.classList.toggle("is-interactive", next === "interactive");
      cursor.classList.toggle("is-view", next === "view");
      cursor.classList.toggle("is-text", next === "text");
      if (next === "view" && labelRef.current) {
        labelRef.current.textContent = label || "İNCELE ↗";
      }
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(update);
      }
    };

    const resetMagnetic = () => {
      magneticTargetX = 0;
      magneticTargetY = 0;
      if (magneticInner && !magneticElement) {
        magneticInner.style.transform = "";
        magneticInner = null;
      }
      magneticElement = null;
    };

    const update = () => {
      frameX += (mouseX - frameX) * 0.18;
      frameY += (mouseY - frameY) * 0.18;
      dotX += (mouseX - dotX) * 0.38;
      dotY += (mouseY - dotY) * 0.38;

      const scale = pressed ? 0.92 : 1;
      cursor.style.transform = `translate3d(${frameX.toFixed(2)}px, ${frameY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale})`;
      const dot = cursor.querySelector<HTMLElement>(".kuk-cursor__dot");
      if (dot) {
        const dx = dotX - frameX;
        const dy = dotY - frameY;
        dot.style.transform = `translate(calc(-50% + ${dx.toFixed(2)}px), calc(-50% + ${dy.toFixed(2)}px))`;
      }

      if (magneticInner) {
        magneticX += (magneticTargetX - magneticX) * 0.16;
        magneticY += (magneticTargetY - magneticY) * 0.16;
        magneticInner.style.transform = `translate3d(${magneticX.toFixed(2)}px, ${magneticY.toFixed(2)}px, 0)`;
        if (!magneticElement && Math.abs(magneticX) < 0.05 && Math.abs(magneticY) < 0.05) {
          magneticInner.style.transform = "";
          magneticInner = null;
          magneticX = 0;
          magneticY = 0;
        }
      }

      const settled = Math.abs(mouseX - frameX) < 0.08 && Math.abs(mouseY - frameY) < 0.08 && !magneticInner;
      if (!settled || pressed) {
        raf = requestAnimationFrame(update);
      } else {
        running = false;
      }
    };

    const findTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return { mode: "normal" as CursorMode };
      if (target.closest('input, textarea, [contenteditable="true"]')) return { mode: "text" as CursorMode };
      const view = target.closest<HTMLElement>('[data-cursor="view"], [data-cursor-label]');
      if (view) return { mode: "view" as CursorMode, label: view.getAttribute("data-cursor-label") || "İNCELE ↗", element: view };
      const magnetic = target.closest<HTMLElement>("[data-cursor-magnetic]");
      if (magnetic) return { mode: "interactive" as CursorMode, magnetic };
      const interactive = target.closest('a, button, [role="button"], summary, select, label, .service-row');
      if (interactive) return { mode: "interactive" as CursorMode };
      return { mode: "normal" as CursorMode };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      root.classList.remove("kuk-cursor-keyboard");
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        frameX = mouseX;
        frameY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
        cursor.classList.add("is-visible");
      }

      const found = findTarget(event.target);
      setMode(found.mode, found.label);

      if (found.magnetic) {
        if (magneticElement !== found.magnetic) {
          resetMagnetic();
          magneticElement = found.magnetic;
          magneticInner = found.magnetic.querySelector<HTMLElement>("[data-magnetic-inner]") || found.magnetic;
          magneticX = 0;
          magneticY = 0;
        }
        const rect = found.magnetic.getBoundingClientRect();
        const relX = (event.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width / 2, 1);
        const relY = (event.clientY - (rect.top + rect.height / 2)) / Math.max(rect.height / 2, 1);
        magneticTargetX = Math.max(-6, Math.min(6, relX * 6));
        magneticTargetY = Math.max(-4.5, Math.min(4.5, relY * 4.5));
      } else if (magneticElement) {
        resetMagnetic();
      }

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!pressed) cursor.classList.remove("is-visible");
        visible = false;
      }, 2600);
      startLoop();
    };

    const onPointerOver = (event: PointerEvent) => {
      const found = findTarget(event.target);
      setMode(found.mode, found.label);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pressed = true;
      cursor.classList.add("is-pressed");
      startLoop();
    };
    const onPointerUp = () => {
      pressed = false;
      cursor.classList.remove("is-pressed");
      startLoop();
    };
    const onPointerLeave = () => {
      visible = false;
      cursor.classList.remove("is-visible");
      resetMagnetic();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      root.classList.add("kuk-cursor-keyboard");
      cursor.classList.remove("is-visible");
      visible = false;
      resetMagnetic();
    };
    const onBlur = () => {
      visible = false;
      cursor.classList.remove("is-visible");
      resetMagnetic();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, true);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onBlur);

    return () => {
      root.classList.remove("kuk-cursor-enabled", "kuk-cursor-keyboard");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver, true);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onBlur);
      window.clearTimeout(idleTimer);
      if (raf) cancelAnimationFrame(raf);
      if (magneticInner) magneticInner.style.transform = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="kuk-cursor" ref={cursorRef} aria-hidden="true">
      <span className="kuk-cursor__corner kuk-cursor__corner--tl" />
      <span className="kuk-cursor__corner kuk-cursor__corner--tr" />
      <span className="kuk-cursor__corner kuk-cursor__corner--br" />
      <span className="kuk-cursor__corner kuk-cursor__corner--bl" />
      <span className="kuk-cursor__dot" />
      <span className="kuk-cursor__label" ref={labelRef}>İNCELE ↗</span>
    </div>
  );
}
