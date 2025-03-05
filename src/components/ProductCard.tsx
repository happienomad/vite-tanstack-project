import { styled } from "styled-components";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Trans } from "@lingui/react/macro";
import { Typography } from "./Typography";
import { Product } from "~/global/types/product";
import Button from "./Button";
import { device } from "../GlobalStyles";

export const StyledProductCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-larger);
    justify-content: center;
    align-items: center;
    padding: var(--spacing-base);
    text-align: left;
    
    @media(${device.sm}) {
        text-align: center;
    }
`;

export const StyledProductCardSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: var(--spacing-medium);

    @media(${device.sm}) {
        flex-direction: column;
    }
`;

export const StyledProductCardRateSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: var(--spacing-xsmall);

    @media(${device.sm}) {
        align-items: center;
    }

`;

export interface ProductCardProps {
    product: Product;
    onSelect?: (productId: number) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {

    const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>, product: Product) => {
        if(event.key === "Enter" && onSelect) {
            onSelect(product.id)
        }
    }

    if(!product) {
        return;
    }

    return (<StyledProductCard variant="small" key={product.id}>
        <StyledProductCardSection>
            <div>
                <Heading element="h3">
                    <Trans>
                        Best {product.type === "FIXED" ? "Fixed" : "Variable"}
                    </Trans>
                </Heading>
                <Typography fontSize="small">{product.name}</Typography>
            </div>
            <StyledProductCardRateSection>
                <Typography fontSize="medium" color="disabled" textDecoration="line-through">{product.rate}%</Typography>
                <Typography fontSize="largest" color="primary" fontWeight="600">{product.bestRate}%</Typography>
            </StyledProductCardRateSection>
        </StyledProductCardSection>
        <Typography>{product.lenderName}</Typography>
        {
            onSelect && <Button aria-label={`Select ${product.name}`} onKeyPress={(event) => handleKeyPress(event, product)} onClick={() => onSelect(product.id)}>
                <Trans>Select this product</Trans>
            </Button>
        }
    </StyledProductCard>)
}