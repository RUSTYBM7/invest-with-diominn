import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invest With Diomin",
  description: "Beyond Wealth. Build Legacy.",
  metadataBase: new URL("https://investwithdiomin.today")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="border-b border-fog/50 sticky top-0 z-50 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Image src="/assets/brand/logo-main.png" width={36} height={36} alt="Invest With Diomin logo" />
              <span className="font-serif text-xl">Invest With Diomin</span>
            </Link>
            <nav className="ml-auto flex gap-5 text-sm">
              <Link href="/advisory">Advisory</Link>
              <Link href="/real-estate">Real Estate</Link>
              <Link href="/fintech">Fintech</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/contact" className="font-medium">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-fog/60">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row gap-4 md:items-center">
            <Image src="/assets/brand/logo-main.png" width={28} height={28} alt="IWD" />
            <div className="opacity-80">
              © {new Date().getFullYear()} Invest With Diomin. All rights reserved. CPWA® is a registered mark of the Investments & Wealth Institute™.
            </div>
            <div className="md:ml-auto flex gap-4">
              <a href="https://instagram.com/investwithdiomin" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://wa.me/15092946731" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
