import { queryOptions } from "@tanstack/react-query";
import { Product } from "~/global/types/product";
import { Application } from "~/global/types/application";
import { getData } from "../fetch";

export const productsQueryOptions = queryOptions<Product[]>({
    queryKey: ['products'],
    queryFn: () => getData('products'),
    staleTime: 5000
});


export const applicationQueryOptions = (applicationId: string) => {
    return queryOptions<Application>({
        queryKey: ['application',],
        queryFn: () => getData(`applications/${applicationId}`)
    })
}