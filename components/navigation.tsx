"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              Todoify
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="#features"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            About
          </Link>
        </div>

        {/* Signup button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/signup"
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-4 pt-2">
            <Link
              href="#features"
              className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/signup"
              className="mt-4 block rounded-full bg-emerald-500 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
