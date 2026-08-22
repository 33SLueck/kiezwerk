'use client';

import * as React from 'react';
import type { OtpInputProps } from './otp-input.types';
import { getOtpContainerClasses, getOtpInputItemClasses } from './otp-input.styles';

export const OtpInput = ({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  className,
  error = false,
}: OtpInputProps) => {
  const [digits, setDigits] = React.useState<string[]>(() => {
    const arr = value.split('');
    while (arr.length < length) arr.push('');
    return arr.slice(0, length);
  });

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    const valDigits = value.split('').slice(0, length);
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < length; i++) {
        next[i] = valDigits[i] ?? '';
      }
      return next;
    });
  }, [value, length]);

  const triggerChange = (newDigits: string[]) => {
    const joined = newDigits.join('');
    if (onChange) onChange(joined);
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const lastChar = val.substring(val.length - 1);

    const nextDigits = [...digits];
    nextDigits[index] = lastChar;
    setDigits(nextDigits);
    triggerChange(nextDigits);

    if (lastChar !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index] === '' && index > 0) {
        const nextDigits = [...digits];
        nextDigits[index - 1] = '';
        setDigits(nextDigits);
        triggerChange(nextDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const nextDigits = [...digits];
        nextDigits[index] = '';
        setDigits(nextDigits);
        triggerChange(nextDigits);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
    const nextDigits = [...digits];
    for (let i = 0; i < length; i++) {
      if (pasteData[i]) {
        nextDigits[i] = pasteData[i];
      }
    }
    setDigits(nextDigits);
    triggerChange(nextDigits);
    const lastIdx = Math.min(pasteData.length, length - 1);
    inputRefs.current[lastIdx]?.focus();
  };

  return (
    <div className={getOtpContainerClasses(className)}>
      {digits.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleInputChange(idx, e)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          className={getOtpInputItemClasses(error)}
          autoComplete="one-time-code"
          pattern="\d*"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};
