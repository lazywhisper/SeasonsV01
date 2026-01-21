import { useEffect, useState } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(233, 199, 116, 0.03), rgba(242, 119, 131, 0.02), rgba(180, 75, 203, 0.02), transparent 40%)`,
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
