import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { postData } from '../../api/fetch'
import { Product, ProductType, ProductTypeKeys } from '~/global/types/product'
import { ProductList } from './ProductList/ProductList';
import { Trans } from '@lingui/react/macro';
import { Heading } from '~/components/Heading';
import { Application, CreateApplication } from '~/global/types/application';
import { useRouter } from '@tanstack/react-router';
import { productsQueryOptions } from '~/api/queries/queryOptions';
import { StyledProductsContainer, StyledProductSelector } from './ProductSelector.styled';

type ProductCards = {
    [key in ProductTypeKeys]: Product[];
};

export function ProductSelector() {

    const { navigate } = useRouter();
    const { data: allProducts } = useSuspenseQuery(productsQueryOptions);

    const mutation = useMutation({
        mutationKey: ["createApplication"],
        mutationFn: (body: CreateApplication) => postData("applications", JSON.stringify(body)),
        onSuccess: (data: Application) => {
            void navigate({
                to: "/applications/$applicationId",
                params: { applicationId: data.id }
            })
        },
        onError: (error) => console.error(error)
    })

    const products: ProductCards = {
        FIXED: [],
        VARIABLE: [],
    }

    if (allProducts) {
        allProducts.forEach((product) => {
            if (ProductType.safeParse(product.type).success) {
                products[product.type].push(product)
            }
        });
    }

    const onProductSelect = (productId: number) => {
        mutation.mutate({ productId })
    }
    
    return (
        <StyledProductSelector>
            <Heading element="h1" align="center">
                <Trans>
                    We found some best products for you
                </Trans>
            </Heading>
            <StyledProductsContainer>
                {ProductType.options.map((type: ProductTypeKeys) => (
                        <ProductList key={type} products={products[type]} onProductSelect={onProductSelect} />
                    )
                )}       
            </StyledProductsContainer>
        </StyledProductSelector>
    )
}