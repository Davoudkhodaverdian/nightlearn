import Categories from "@/components/panel/categories";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Categories',
    description: 'Categories',
}

export default function CategoriesPage() {
    return <Categories />;
}
