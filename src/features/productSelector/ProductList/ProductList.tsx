import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { ProductCard } from "~/components/ProductCard";
import { Typography } from "~/components/Typography";
import { Product, ProductTypeKeys } from "~/global/types/product";
import { Products } from "./ProductList.styled";

const ProductTypeMap : {
    [key in ProductTypeKeys] : string
} = {
    "FIXED" : t`Fixed`,
    "VARIABLE": t`Variable`
}

interface ProductListProps {
    type: ProductTypeKeys;
    products: Product[];
    onProductSelect: (productId: number) => void;
}

export function ProductList({ type, products, onProductSelect } : ProductListProps) {
    const productType = ProductTypeMap[type];


    const bestRateProducts = products.reduce((acc, product) => {
        if (acc.length === 0 || product.bestRate === acc[0].bestRate) {
            acc.push(product);
        } else if (product.bestRate < acc[0].bestRate) {
            acc = [product];
        }
        return acc;
    }, [] as Product[]);
    
    return (
        <Products.Container>
            <Typography fontSize="medium" fontWeight="400">
                <Trans>
                    {productType} rate products
                </Trans>
            </Typography>
            <Products.List>
                {
                    bestRateProducts.map((product) => (
                        <Products.Card key={product.id}>
                            <ProductCard product={product} onSelect={(product: Product) => onProductSelect(product.id)} />
                        </Products.Card>
                    ))
                }
            </Products.List>
        </Products.Container>
    )
}