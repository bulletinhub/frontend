"use client";
import { useState, ReactNode, forwardRef, useImperativeHandle } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export type DrawerRefProps = {
  closeDrawer: () => void
  openDrawer: () => void
}

type PositionTypes = 'left' | 'right'

interface DrawerProps {
  children: ReactNode
  position: PositionTypes
}

export const Drawer = forwardRef<DrawerRefProps, DrawerProps>(
  function DrawerComponent({ children, position }, ref) {
    const [isOpened, setIsOpened] = useState(false);

    function closeDrawer() {
      setIsOpened(false);
    }

    function openDrawer() {
      setIsOpened(true);
    }

    function definePosition() {
      switch (position) {
        case 'left':
          return isOpened ? 'left-0 absolute' : '-left-80 absolute'
        case 'right':
          return isOpened ? 'right-0 fixed' : '-right-80 fixed'
      }
    }

    useImperativeHandle(ref, () => {
      return {
        closeDrawer,
        openDrawer,
      };
    }, []);

    return (
      <div className={`
        flex
        flex-col
        min-h-screen
        border
        z-10
        top-0
        w-80
        p-4
        overflow-y-auto
        bg-stone-100
        shadow-xl
        transition-all
        duration-300
        ease-in-out
        ${definePosition()}
      `}>
        <button
          aria-label="Close drawer"
          onClick={() => setIsOpened(!isOpened)}
          className={`
            flex
            items-center
            justify-center
            rounded-full
            size-10
            hover:bg-stone-300/50
            ${position === 'left' ? 'self-end' : 'self-start'}
        `}>
          {position === 'left' ? 
              <FontAwesomeIcon icon={faChevronLeft} className="text-lg md:text-xl" /> 
            : 
              <FontAwesomeIcon icon={faChevronRight} className="text-lg md:text-xl" /> 
          }
        </button>
        {children}
      </div>
    )
  }
)