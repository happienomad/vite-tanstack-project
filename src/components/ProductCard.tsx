import { styled } from "styled-components";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Trans } from "@lingui/react/macro";
import { Typography } from "./Typography";
import { Product } from "~/global/types/product";
import Button from "./Button";

export const StyledProductCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-larger);
    justify-content: center;
    align-items: center;
    padding: var(--spacing-base)
`;

export const StyledProductCardSection = styled.div`
    text-align: center;
`;

export interface ProductCardProps {
    product: Product;
    onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    return (<StyledProductCard variant="small" key={product.id}>
        <StyledProductCardSection>
            <Heading element="h3">
                <Trans>
                    Best {product.type === "FIXED" ? "Fixed" : "Variable"}
                </Trans>
            </Heading>
            <Typography fontSize="small">{product.name}</Typography>
        </StyledProductCardSection>
        <StyledProductCardSection>
            <Typography fontSize="base" color="secondary" textDecoration="line-through">{product.rate}%</Typography>
            <Typography fontSize="largest" color="primary" fontWeight="600">{product.bestRate}%</Typography>
        </StyledProductCardSection>
        <Typography>{product.lenderName}</Typography>
        {
            onSelect && <Button onClick={() => onSelect(product)}>
                <Trans>Select this product</Trans>
            </Button>
        }
    </StyledProductCard>)
}