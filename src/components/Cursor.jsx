import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Cursor = () => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isLargeDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 5;
        posY += (mouseY - posY) / 5;

        gsap.set(cursor, {
          left: mouseX,
          top: mouseY,
        });

        gsap.set(follower, {
          left: posX - 15,
          top: posY - 15,
        });
      },
    });

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    handleLinkHoverEvents();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isLargeDevice]);

  if (!isLargeDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[2001] transition-transform duration-300 ease-out mix-blend-difference ${
          isHovering ? 'scale-[2]' : ''
        }`}
        style={{
          left: '-100px',
          top: '-100px',
        }}
      ></div>
      <div
        ref={followerRef}
        className={`fixed w-10 h-10 rounded-full pointer-events-none z-[2000] transition-all duration-300 ease-out mix-blend-difference ${
          isHovering ? 'scale-150 opacity-50' : 'opacity-30'
        }`}
        style={{
          left: '-100px',
          top: '-100px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      ></div>
    </>
  );
};

export default Cursor;
