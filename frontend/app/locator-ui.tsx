'use client';

import setupLocatorUI from '@locator/runtime';

export default function LocatorUI() {
  if (process.env.NODE_ENV === 'development') {
    setupLocatorUI();
  }
  return null;
}
