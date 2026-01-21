"use client";

import { Box, Stack } from "@mui/material";
import RegistrationsHeader from "../../components/registrations/RegistrationsHeader";
import RegistrationsTable from "../../components/registrations/RegistrationsTable";
import WarehouseAddRegistrationModal from "../../components/registrations/WarehouseAddRegistrationModal";
import { useState } from "react";

export default function RegistrationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleRefresh = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleAddSuccess = () => {
        handleRefresh();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={4}>
                <RegistrationsHeader
                    onSearch={handleSearch}
                    onRefresh={handleRefresh}
                    onAdd={() => setIsAddModalOpen(true)}
                />
                <RegistrationsTable searchQuery={searchQuery} refreshTrigger={refreshTrigger} />
            </Stack>

            <WarehouseAddRegistrationModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
            />
        </Box>
    );
}
