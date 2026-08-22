'use client';

import * as React from 'react';
import type { DropdownProps } from './dropdown.types';
import {
  getDropdownClasses,
  getDropdownMenuClasses,
  getDropdownItemClasses,
} from './dropdown.styles';

export const Dropdown = ({ trigger, items, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const dropdownId = React.useId();

  React.useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      const firstEnabledIdx = items.findIndex((item) => !item.disabled);
      if (firstEnabledIdx !== -1) {
        setTimeout(() => {
          itemRefs.current[firstEnabledIdx]?.focus();
        }, 50);
      }
    }
  }, [isOpen, items]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
      e.preventDefault();
      return;
    }

    if (e.key === 'Tab') {
      setIsOpen(false);
      return;
    }

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const activeEl = document.activeElement as HTMLButtonElement | null;
    const activeIdx = itemRefs.current.indexOf(activeEl);

    let nextIdx = activeIdx;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        for (let i = 1; i <= items.length; i++) {
          const checkIdx = (activeIdx + i) % items.length;
          if (!items[checkIdx].disabled) {
            nextIdx = checkIdx;
            break;
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        for (let i = 1; i <= items.length; i++) {
          const checkIdx = (activeIdx - i + items.length) % items.length;
          if (!items[checkIdx].disabled) {
            nextIdx = checkIdx;
            break;
          }
        }
        break;
      case 'Home': {
        e.preventDefault();
        const firstEnabled = items.findIndex((item) => !item.disabled);
        if (firstEnabled !== -1) nextIdx = firstEnabled;
        break;
      }
      case 'End': {
        e.preventDefault();
        const lastEnabledIdx = items
          .map((item, idx) => ({ item, idx }))
          .reverse()
          .find(({ item }) => !item.disabled)?.idx;
        if (lastEnabledIdx !== undefined) nextIdx = lastEnabledIdx;
        break;
      }
      default:
        return;
    }

    if (nextIdx !== activeIdx) {
      itemRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div ref={containerRef} className={getDropdownClasses(className)} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        id={`dropdown-trigger-${dropdownId}`}
        aria-controls={`dropdown-menu-${dropdownId}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-center"
      >
        {trigger}
      </button>

      <div
        id={`dropdown-menu-${dropdownId}`}
        aria-labelledby={`dropdown-trigger-${dropdownId}`}
        className={getDropdownMenuClasses(isOpen)}
        role="menu"
      >
        <div className="py-1" role="none">
          {items.map((item, idx) => (
            <button
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={getDropdownItemClasses(item.disabled)}
              role="menuitem"
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              disabled={item.disabled}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
