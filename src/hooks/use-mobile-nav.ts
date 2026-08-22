import { useState } from 'react';

export const useMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};
