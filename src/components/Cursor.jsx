import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Cursor = () => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

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
          left: posX - 20,
          top: posY - 20,
        });
      },
    });

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('scale-50');
          follower.classList.add('scale-150');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('scale-50');
          follower.classList.remove('scale-150');
        });
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
        className="fixed w-2 h-2 bg-black rounded-full pointer-events-none z-[2000] transition-transform duration-200 ease-out"
        style={{ left: '-100px', top: '-100px' }}
      ></div>
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border-2 border-black border-opacity-50 rounded-full pointer-events-none z-40 transition-transform duration-200 ease-out"
        style={{ left: '-100px', top: '-100px' }}
      ></div>
    </>
  );
};

export default Cursor;
