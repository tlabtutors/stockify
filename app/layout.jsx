import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { auth } from "@/auth";
import SessionProvider from "@/context/SessionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stockiffy Inventory System",
  description: "Stockiffy Inventory Application",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <SessionProvider session={session}>
            {children}
            <Toaster position="top-center" />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
