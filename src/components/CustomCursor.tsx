import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'badge'>('default');
  const [badgeText, setBadgeText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer aura ring (lagged smooth follow)
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check what element the mouse is hovering
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, input, textarea, select, [role="button"], label, .clickable');
      const headingOrText = target.closest('h1, h2, h3, h4, p, code, blockquote');
      const credlyOrLinkedin = target.closest('a[href*="credly"], a[href*="linkedin"]');

      if (credlyOrLinkedin) {
        setCursorType('badge');
        setBadgeText(target.closest('a[href*="credly"]') ? 'Credly' : 'LinkedIn');
      } else if (clickable) {
        setCursorType('pointer');
        setBadgeText('');
      } else if (headingOrText) {
        setCursorType('text');
        setBadgeText('');
      } else {
        setCursorType('default');
        setBadgeText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision inner center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/80 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicking ? 0.6 : cursorType === 'text' ? 1.4 : cursorType === 'pointer' ? 1.5 : 1,
          backgroundColor: cursorType === 'badge' ? '#fbbf24' : '#22d3ee',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Outer Ring / Reactive Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[0.5px]"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width:
            cursorType === 'badge'
              ? 64
              : cursorType === 'pointer'
              ? 44
              : cursorType === 'text'
              ? 34
              : 26,
          height:
            cursorType === 'badge'
              ? 32
              : cursorType === 'pointer'
              ? 44
              : cursorType === 'text'
              ? 34
              : 26,
          marginLeft:
            cursorType === 'badge'
              ? -32
              : cursorType === 'pointer'
              ? -22
              : cursorType === 'text'
              ? -17
              : -13,
          marginTop:
            cursorType === 'badge'
              ? -16
              : cursorType === 'pointer'
              ? -22
              : cursorType === 'text'
              ? -17
              : -13,
          borderColor:
            cursorType === 'badge'
              ? 'rgba(251, 191, 36, 0.7)'
              : cursorType === 'pointer'
              ? 'rgba(34, 211, 238, 0.75)'
              : cursorType === 'text'
              ? 'rgba(56, 189, 248, 0.45)'
              : 'rgba(148, 163, 184, 0.3)',
          backgroundColor:
            cursorType === 'badge'
              ? 'rgba(245, 158, 11, 0.12)'
              : cursorType === 'pointer'
              ? 'rgba(34, 211, 238, 0.12)'
              : cursorType === 'text'
              ? 'rgba(56, 189, 248, 0.08)'
              : 'rgba(15, 23, 42, 0.05)',
          scale: isClicking ? 0.8 : 1,
          borderRadius: cursorType === 'badge' ? 16 : 9999,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        {cursorType === 'badge' && badgeText && (
          <span className="text-[10px] font-mono font-bold tracking-wider text-amber-300 uppercase pointer-events-none">
            {badgeText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
