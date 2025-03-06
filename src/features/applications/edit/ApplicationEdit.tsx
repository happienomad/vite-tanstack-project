import { useSuspenseQuery } from "@tanstack/react-query"
import { StyledApplicationEdit } from "./ApplicationEdit.styled"
import { getRouteApi } from "@tanstack/react-router";
import { ProductCard } from "~/components/ProductCard";
import { ApplicationForm } from "./form/ApplicationForm";
import { applicationbyIdQueryOptions, productsQueryOptions } from "~/api/queries/queryOptions";
import { LoadingOverlay } from "~/components/LoadingOverlay";


const routeApi = getRouteApi("/_products/applications/$applicationId");

export function ApplicationEdit() {

    const { applicationId } = routeApi.useParams();

    const { data: applicationInfo, isPending } = useSuspenseQuery(applicationbyIdQueryOptions(applicationId));

    const { data: allProducts } = useSuspenseQuery(productsQueryOptions);
    

    const selectedProduct = allProducts.find((product) => product.id === applicationInfo.productId);

    return (
        <StyledApplicationEdit.Container>
            <StyledApplicationEdit.ProductDetails>
                {
                    selectedProduct && <ProductCard product={selectedProduct} />
                }
            </StyledApplicationEdit.ProductDetails>
            <StyledApplicationEdit.ApplicationForm>
                <ApplicationForm applicationId={applicationId} applicant={applicationInfo.applicants[0]}>
                    { isPending && <LoadingOverlay />}
                </ApplicationForm>
            </StyledApplicationEdit.ApplicationForm>
        </StyledApplicationEdit.Container>
    )
}