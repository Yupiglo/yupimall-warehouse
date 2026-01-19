import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import "./globals.css";
import Favicon from "@/assets/Logo/favicon.ico";
import { env } from "next-runtime-env";
import cover from "@/assets/AuthImageCover.svg";

export const metadata: Metadata = {
  metadataBase: new URL(`${env("NEXT_PUBLIC_YUPIFLOW_URL")}`),
  title: "YupiFlow Dashboard",
  description: "YupiFlow Dashboard Application",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    type: "website",
    description: "",
    title: "YupiFlow Dashboard Application",
    url: `${env("NEXT_PUBLIC_YUPIFLOW_URL")}`,
    images: [
      {
        url: `${env("NEXT_PUBLIC_YUPIFLOW_URL")}${cover.src}`,
      },
    ],
  },
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
