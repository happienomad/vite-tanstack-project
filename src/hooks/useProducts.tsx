import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "~/api/queries/queryOptions";
import { ProductMap } from "~/global/types/product";

export function useProducts() {
    const { data: allProducts } = useSuspenseQuery(productsQueryOptions);

    const productMap: ProductMap = {}

    allProducts.forEach((product) => {
        productMap[product.id] = product;
    });

    return productMap;
}