import { queryOptions } from "@tanstack/react-query";
import { Product } from "~/global/types/product";
import { Application } from "~/global/types/application";
import { getData } from "../fetch";

export const productsQueryOptions = queryOptions<Product[]>({
    queryKey: ['products'],
    queryFn: () => getData('products'),
    staleTime: 5000
});


export const applicationbyIdQueryOptions = (applicationId: string) => {
    return queryOptions<Application>({
        queryKey: ['applicationById'],
        queryFn: () => getData(`applications/${applicationId}`)
    })
}

export const applicationsQueryOptions = () => {
    return queryOptions<Application[]>({
        queryKey: ['applications'],
        queryFn: () => getData("applications")
    })
}