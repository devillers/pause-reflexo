

// app/components/StickyHeader.js
'use client';
import { useEffect, useState, useRef } from 'react';

export default function StickyHeader({ children }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        setShow(true); // scroll up → show
      } else {
        setShow(false); // scroll down → hide
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      ref={ref}
      className={`fixed left-0 w-full  transition-transform duration-300 ease-in-out
      ${show ? 'translate-y-[-450px]' : '-translate-y-full'}
      top-0`}
      style={{ height: 'auto' }}
    >
      {children}
    </div>
  );
}
