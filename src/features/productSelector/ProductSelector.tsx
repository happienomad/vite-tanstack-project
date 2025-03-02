import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { postData } from '../../api/fetch'
import { Product, ProductType, ProductTypeKeys } from '~/global/types/product'
import { ChangeEvent, useState } from 'react'
import ToggleSwitch from '~/components/ToggleSwitch';
import { Products } from './ProductList'
import { Trans } from '@lingui/react/macro';
import { Heading } from '~/components/Heading';
import { Application, CreateApplication } from '~/global/types/application';
import { useNavigate } from '@tanstack/react-router';
import { StyledProductSelector } from './ProductSelector.styled';
import { productsQueryOptions } from '~/api/queries/queryOptions';

type ProductCards = {
    [key in ProductTypeKeys]: Product[];
};

export function ProductSelector() {

    const navigate = useNavigate();

    const { data: allProducts } = useSuspenseQuery(productsQueryOptions);

    const mutation = useMutation({
        mutationKey: ["createApplication"],
        mutationFn: (body: CreateApplication) => postData("applications", JSON.stringify(body)),
        onSuccess: (data: Application) => {
            void navigate({
                to: `/applications/${data.id}`
            })
        },
        onError: (error) => console.error(error)
    })

    const products: ProductCards = {
        FIXED: [],
        VARIABLE: [],
    }

    const [selectedProductType, setSelectedProductType] = useState<ProductTypeKeys>('FIXED');

    if (allProducts) {
        allProducts.forEach((product) => {
            if (ProductType.safeParse(product.type).success) {
                products[product.type].push(product)
            }
        });
    }


    const bestRateProducts = products[selectedProductType].reduce((acc, product) => {
        if (acc.length === 0 || product.bestRate === acc[0].bestRate) {
            acc.push(product);
        } else if (product.bestRate < acc[0].bestRate) {
            acc = [product];
        }
        return acc;
    }, [] as Product[]);

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedProductType(e.target.checked ? "FIXED" : "VARIABLE");
    }

    return (
        <StyledProductSelector>
            <Heading element="h1">
                <Trans>
                    We found some best products for you
                </Trans>
            </Heading>
            <ToggleSwitch
                onLabel={ProductType.Enum.FIXED}
                offLabel={ProductType.Enum.VARIABLE}
                handleToggle={handleToggle}
                id="productType"
                name="productType"
                checked={selectedProductType === "FIXED"}
            />
            <Products.List>
                {
                    bestRateProducts.map((product) => (
                        <Products.Card key={product.id} product={product} onSelect={(product: Product) => mutation.mutate({ productId: product.id })} />
                    ))
                }
            </Products.List>
        </StyledProductSelector>
    )
}