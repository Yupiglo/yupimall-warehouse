import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | YupiFlow Warehouse",
    description: "Create your warehouse account",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
