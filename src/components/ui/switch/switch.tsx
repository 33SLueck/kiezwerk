'use client';

import * as React from 'react';
import type { SwitchProps } from './switch.types';
import {
  getSwitchContainerClasses,
  getSwitchTrackClasses,
  getSwitchThumbClasses,
} from './switch.styles';

export const Switch = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className,
  id,
  name,
  value = 'on',
}: SwitchProps) => {
  const [internalChecked, setInternalChecked] = React.useState(checked ?? defaultChecked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    const nextState = !internalChecked;
    setInternalChecked(nextState);
    if (onChange) onChange(nextState);
  };

  return (
    <>
      <button
        type="button"
        id={id}
        className={getSwitchContainerClasses(disabled, className)}
        onClick={handleToggle}
        role="switch"
        aria-checked={internalChecked}
        disabled={disabled}
      >
        <div className={getSwitchTrackClasses(internalChecked)}>
          <span className={getSwitchThumbClasses(internalChecked)} />
        </div>
      </button>
      {name ? (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={internalChecked}
          className="sr-only"
          readOnly
        />
      ) : null}
    </>
  );
};
