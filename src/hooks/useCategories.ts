"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface Category {
    _id: string;
    name: string;
    slug: string;
    Image?: string;
}

export interface Subcategory {
    id: string | number;
    _id?: string;
    name: string;
    slug: string;
    category_id?: string | number;
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const [catRes, subRes] = await Promise.all([
                axiosInstance.get("categories"),
                axiosInstance.get("subcategories")
            ]);

            const cats = catRes.data?.getAllCategories || catRes.data?.data || [];
            const subs = subRes.data?.getAllSubCategories || subRes.data?.data || [];

            setCategories(cats);
            setSubcategories(subs);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, subcategories, loading, error, refresh: fetchCategories };
}
