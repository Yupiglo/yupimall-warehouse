import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recover | Yupiflow",
  description: "Recover your account.",
};

export default function RecoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
