import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategoryProduct } from "../../lib/requests/category-product";


const fetchAndUpdateProducts = async ({
    slug,
    cursor = null,
    searchTerm = "",
    tags = [],
    setProducts,
    setPageInfo,
    setLoading,
  }) => {
    setLoading(true);
    try {
        const data = await getCategoryProduct(slug, cursor, 12, searchTerm, tags.join(","));
        setProducts((prev) => (cursor ? [...prev, ...data.productCategory.products.nodes] : data.productCategory.products.nodes));
        setPageInfo(data.productCategory.products.pageInfo);
    } finally {
        setLoading(false);
    }
  };

export const useProductCategory = (initialCategory) => {
    const router = useRouter();
    const [products, setProducts] = useState(initialCategory?.products?.nodes || null);
    const [pageInfo, setPageInfo] = useState(initialCategory?.products?.pageInfo || null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);


    useEffect(() => {
        if(router.query.slug) {
            fetchCategoryProducts(router.query.slug);
        }
    }, [router.query.slug]);

    const fetchCategoryProducts = async (slug) => {
        await fetchAndUpdateProducts({
            slug: slug,
            setProducts,
            setPageInfo,
            setLoading,
            searchTerm,
            tags: selectedTags,
        });
    };

    const loadMoreProducts = async () => {
      
        if (!pageInfo?.hasNextPage || loading) return;
        await fetchAndUpdateProducts({
            slug: initialCategory.slug,
            cursor: pageInfo.endCursor,
            setProducts,
            setPageInfo,
            setLoading,
            searchTerm,
            tags: selectedTags,
        });
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        await fetchAndUpdateProducts({
            slug: initialCategory.slug,
            setProducts,
            setPageInfo,
            setLoading,
            searchTerm,
            tags: selectedTags,
        });
    };

    const handleTagChange = (tag) => {
        setSelectedTags((prevTags) => {
            const updatedTags = prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag];
            fetchAndUpdateProducts({
                slug: initialCategory.slug,
                setProducts,
                setPageInfo,
                setLoading,
                searchTerm,
                tags: updatedTags,
            });
            return updatedTags;
        });
    };

    return {
        products,
        pageInfo,
        loading,
        searchTerm,
        setSearchTerm,
        handleSearch,
        loadMoreProducts,
        handleTagChange,
    };
};
