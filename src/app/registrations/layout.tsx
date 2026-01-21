import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestion des Inscriptions | YupiFlow Warehouse",
    description: "Gérez les inscriptions des nouveaux stockists.",
};

export default function RegistrationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
