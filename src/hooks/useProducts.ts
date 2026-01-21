"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface Product {
    id: string | number;
    _id?: string;
    title: string;
    slug?: string;
    description?: string;
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    sold?: number;
    imgCover?: string;
    img_cover?: string;
    images?: string[];
    ratingsAverage?: number;
    ratingsQuantity?: number;
    category?: {
        id?: number | string;
        _id?: string;
        name: string;
    } | string;
    categoryId?: string;
    categoryName?: string;
    subcategory?: {
        id?: number | string;
        _id?: string;
        name: string;
    } | string;
    subcategoryId?: string;
    subcategoryName?: string;
    brand?: {
        id?: number | string;
        _id?: string;
        name: string;
    } | string;
    benefits?: string[];
    ingredients?: string[];
    howToUse?: string;
    clinicalResearch?: string;
    pv?: number;
    discountPercentage?: number;
    variants?: string | Array<{ key: string; value: string }>;
}

// Normalize product data from API to consistent format
function normalizeProduct(data: any): Product {
    return {
        id: data.id || data._id || "",
        _id: data._id || data.id || "",
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        price: data.price || 0,
        priceAfterDiscount: data.priceAfterDiscount || data.price_after_discount,
        quantity: data.quantity || 0,
        sold: data.sold || 0,
        imgCover: data.imgCover || data.img_cover || "",
        images: data.images || [],
        ratingsAverage: data.ratingsAverage || data.ratings_average || 0,
        ratingsQuantity: data.ratingsQuantity || data.ratings_quantity || 0,
        category: data.category,
        categoryId: data.categoryId || data.category_id,
        categoryName: data.categoryName || data.category_name,
        subcategory: data.subcategory,
        subcategoryId: data.subcategoryId || data.subcategory_id,
        subcategoryName: data.subcategoryName || data.subcategory_name,
        brand: data.brand,
        benefits: data.benefits || [],
        ingredients: data.ingredients || [],
        howToUse: data.howToUse || data.how_to_use || "",
        clinicalResearch: data.clinicalResearch || data.clinical_research || "",
        pv: data.pv || 0,
        discountPercentage: data.discountPercentage || data.discount_percentage || 0,
        variants: data.variants || [],
    };
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("products");
            const data = response.data?.getAllProducts || response.data?.data || response.data?.products || response.data || [];
            if (Array.isArray(data)) {
                setProducts(data.map(normalizeProduct));
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refresh: fetchProducts };
}

export function useProduct(id: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const response = await axiosInstance.get(`products/${id}`);
            const data = response.data?.getSpecificProduct || response.data?.getProduct || response.data?.data || response.data?.product || response.data;
            if (data) {
                setProduct(normalizeProduct(data));
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { product, loading, error, refresh: fetchProduct };
}

