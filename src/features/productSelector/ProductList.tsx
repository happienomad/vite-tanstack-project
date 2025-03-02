import { PropsWithChildren } from "react";
import { Product } from "~/global/types/product";
import { StyledCardContainer } from "./ProductSelector.styled";
import { ProductCard } from "~/components/ProductCard";


interface ProductCardProps {
    product: Product;
    onSelect: (product: Product) => void;
}

export const Products = {
    List: ({ children }: PropsWithChildren) => {
        return (
            <StyledCardContainer>
                {children}
            </StyledCardContainer>
        );
    },
    Card: ({ product, onSelect }: ProductCardProps) => {
        return (
            <ProductCard product={product} onSelect={onSelect} />
        )
    }
}