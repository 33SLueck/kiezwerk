'use client';

import * as React from 'react';
import type { TabsProps } from './tabs.types';
import {
  getTabsContainerClasses,
  getTabsListClasses,
  getTabButtonClasses,
  getTabPanelClasses,
} from './tabs.styles';

export const Tabs = ({ items, defaultActiveId, activeId, onChange, className }: TabsProps) => {
  const [internalActiveId, setInternalActiveId] = React.useState(
    activeId ?? defaultActiveId ?? items[0]?.id
  );

  const activeTabId = activeId ?? internalActiveId;
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, items.length);
  }, [items]);

  const handleTabClick = (id: string) => {
    setInternalActiveId(id);
    if (onChange) onChange(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const activeIndex = items.findIndex((item) => item.id === activeTabId);
    if (activeIndex === -1) return;

    let nextIndex: number;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (activeIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
        nextIndex = (activeIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const nextItem = items[nextIndex];
    handleTabClick(nextItem.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const activeTab = items.find((item) => item.id === activeTabId);

  return (
    <div className={getTabsContainerClasses(className)}>
      <div className={getTabsListClasses()} role="tablist" onKeyDown={handleKeyDown}>
        {items.map((item, idx) => {
          const isActive = activeTabId === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`tab-${item.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={getTabButtonClasses(isActive)}
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeTab ? (
        <div
          id={`panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          className={getTabPanelClasses()}
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
};
