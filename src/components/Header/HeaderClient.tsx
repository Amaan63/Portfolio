"use client";

import dynamic from 'next/dynamic';

// This line is the key: It imports Header but disables SSR
const Header = dynamic(() => import('./Header'), { ssr: false });

export default function HeaderClient() {
  return <Header />;
}