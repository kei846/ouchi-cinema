import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'OUCHI-CINEMA',
  description: 'さぁ映画の迷宮へ',
  openGraph: {
    title: 'OUCHI-CINEMA',
    description: 'さぁ映画の迷宮へ',
    url: 'https://mikomikopipi.com/',
    siteName: 'OUCHI-CINEMA',
    images: [
      {
        url: 'ここに画像のURLを貼る.jpg', // ここにOGP画像のURLを貼り付けてください
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}