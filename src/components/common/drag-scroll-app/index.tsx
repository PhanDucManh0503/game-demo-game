import React, { useEffect } from 'react';

interface IDragScrollAppProps {
  children: React.ReactNode;
}

const DragScrollApp = ({ children }: IDragScrollAppProps) => {
  useEffect(() => {
    const slider: any = document.querySelector('.drag-scroll-app > div');
    let isDown = false;
    let startX: any;
    let scrollLeft: any;

    if (slider) {
      slider.addEventListener('mousedown', (e: any) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
      });
      slider.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  return <div className="drag-scroll-app">{children}</div>;
};

export default DragScrollApp;
