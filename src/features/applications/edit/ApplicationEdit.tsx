import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { StyledApplicationEdit } from "./ApplicationEdit.styled"
import { useNavigate, useParams } from "@tanstack/react-router";
import { ProductCard } from "~/components/ProductCard";
import { ApplicantForm } from "./form/ApplicantForm";
import { applicationbyIdQueryOptions, productsQueryOptions } from "~/api/queries/queryOptions";
import { LoadingOverlay } from "~/components/LoadingOverlay";
import { postData } from "~/api/fetch";
import { Applicant, Application } from "~/global/types/application";
import { useToast } from "~/global/providers/ToastProvider";


export function ApplicationEdit() {

    const { applicationId } = useParams({
        from: "/_products/applications/$applicationId"
    });
    const navigate = useNavigate();
    const { showToast } = useToast();

    const { data: applicationInfo, isPending } = useSuspenseQuery(applicationbyIdQueryOptions(applicationId));

    const { data: allProducts } = useSuspenseQuery(productsQueryOptions);

    const { mutate: updateApplication, isPending: isUpdatePending } = useMutation({
            mutationKey: ["createApplication"],
            mutationFn: (body: Partial<Application>) => postData(`applications/${applicationId}`, JSON.stringify(body), "PUT"),
            throwOnError: true,
            onSuccess: (data) => {
                if(data) {
                    console.log("Mutation success::", data);
                    void navigate({
                        to: "/applications"
                    })
                }
            },
            onError: (error) => {
                if(error.message) {
                    showToast({
                        message: error.message,
                        status: "error"
                    });
                }
            }
        })
    
        const onSubmit = (data: Applicant) => {
            updateApplication({
                applicants: [data]
            })
        };
    

    const selectedProduct = allProducts.find((product) => product.id === applicationInfo.productId);

    return (
        <StyledApplicationEdit.Container>
            <StyledApplicationEdit.ProductDetails>
                {
                    selectedProduct && <ProductCard product={selectedProduct} />
                }
            </StyledApplicationEdit.ProductDetails>
            <StyledApplicationEdit.ApplicationForm>
                <ApplicantForm isUpdatePending={isUpdatePending} applicant={applicationInfo.applicants[0]} onSubmit={onSubmit}>
                    { isPending && <LoadingOverlay />}
                </ApplicantForm>
            </StyledApplicationEdit.ApplicationForm>
        </StyledApplicationEdit.Container>
    )
}
