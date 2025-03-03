import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { HeadingVariantsType, BaseTypographyType } from "~/global/types/typography";

type HeadingProps = PropsWithChildren & {
    element?: HeadingVariantsType;
    align?: BaseTypographyType["textAlign"];
}

const fontSizeMap: {
    [key in HeadingVariantsType]: BaseTypographyType["fontSize"];
} = {
    "h1": "largest",
    "h2": "larger",
    "h3": "large",
    "h4": "medium",
    "h5": "base",
    "h6": "small"
}

export const Heading = styled(({ element: Element = "h1", ...props }: HeadingProps) => <Element {...props} />)`
    font-size: ${(props: HeadingProps) =>
        `var(--typography--fontSize-${fontSizeMap[props.element || "h1"]})`
    };
    line-height: ${(props: HeadingProps) =>
        `var(--typography--lineHeight-${fontSizeMap[props.element || "h1"]})`
    };
    margin: 0;
    text-align: ${(props: HeadingProps) => props.align}
`;
