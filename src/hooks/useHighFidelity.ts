import { useState, useEffect, useRef, useCallback } from "react";

export function useAudioTick() {
  const audioCtx = useRef<AudioContext | null>(null);
  
  const playTick = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  return playTick;
}

export function useMagnetic(strength = 15) {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const playTick = useAudioTick();

  const handleMouseMove = useCallback((e: any) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / (width / 2);
    const y = (e.clientY - (top + height / 2)) / (height / 2);
    setPosition({ x: x * strength, y: y * strength });
  }, [strength]);

  const handleMouseLeave = useCallback(() => setPosition({ x: 0, y: 0 }), []);
  const handleMouseEnter = useCallback(() => playTick(), [playTick]);

  return { ref, position, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
