import { queryOptions } from "@tanstack/react-query";
import { Product } from "~/global/types/product";
import { Application } from "~/global/types/application";
import { getData } from "../fetch";

export const productsQueryOptions = queryOptions<Product[]>({
    queryKey: ['products'],
    queryFn: () => getData('products'),
});


export const applicationbyIdQueryOptions = (applicationId: string) => {
    return queryOptions<Application>({
        queryKey: ['applicationById', applicationId],
        queryFn: () => getData(`applications/${applicationId}`),
        staleTime: 10000,
        throwOnError: true,
    })
}

export const applicationsQueryOptions = () => {
    return queryOptions<Application[]>({
        queryKey: ['applications'],
        queryFn: () => getData("applications"),
        throwOnError: true
    })
}