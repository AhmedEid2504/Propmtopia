import type { Metadata } from "next";
import "@styles/globals.css";
import Nav from "@components/Nav";
import provider from "@components/provider";
export const metadata: Metadata = {
  title: "Promptopia",
  description: "A platform for users to share their ai prompts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
