import { ProductCard } from "~/components/ProductCard";
import { Product } from "~/global/types/product";
import { StyledProductList } from "./ProductList.styled";

interface ProductListProps {
    products: Product[];
    onProductSelect: (productId: number) => void;
}

export function ProductList({ products, onProductSelect } : ProductListProps) {

    const bestRateProducts = products.reduce((acc, product) => {
        if (acc.length === 0 || product.bestRate === acc[0].bestRate) {
            acc.push(product);
        } else if (product.bestRate < acc[0].bestRate) {
            acc = [product];
        }
        return acc;
    }, [] as Product[]);

    const totalProducts = bestRateProducts.length;

    if(totalProducts === 0) {
        return;
    }
    
    return (
        <StyledProductList>
            <ProductCard product={bestRateProducts[0]} onSelect={onProductSelect} />
            {
                totalProducts > 1 && <a href="#">and {bestRateProducts.length - 1} more product</a>
            }
        </StyledProductList>
    )
}