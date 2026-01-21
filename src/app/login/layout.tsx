import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Yupiflow",
  description: "Login to your account.",
};

export default function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
