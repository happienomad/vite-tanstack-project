import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { BaseTypographyType } from "~/global/types/typography";


interface CardProps extends PropsWithChildren {
    variant?: "small" | "medium" | "large" | "full";
    padding?: BaseTypographyType["fontSize"];
}

export const Card = styled.div<CardProps>`
    border: 1px solid var(--color-dark-300);
    border-radius: 4px;
    padding: ${(props: CardProps) => `var(--spacing-${props.padding || "base"})`};
    margin: var(--spacing-small) 0;
    box-shadow: var(--color-dark-300) 0px 3px 8px;
    width: 100%;
    box-sizing: border-box;
    width: ${(props: CardProps) => {
        switch (props.variant) {
            case "small":
                return "280px";
            case "medium":
                return "400px";
            case "large":
                return "600px";
            case "full":
                return "100%";
        }
    }

    }`;
