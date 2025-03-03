import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BaseTypographyType } from '~/global/types/typography';

type TypographyProps = BaseTypographyType & PropsWithChildren & {
    element?: 'p' | 'span' | 'em' | 'strong';
}

export const Typography = styled(({ element: Element = "p", ...props }: TypographyProps) => <Element {...props} />)`
    text-transform: ${(props: TypographyProps) => props.textCase || "none"};
    margin: 0;
    font-size: ${(props: TypographyProps) => `var(--typography--fontSize-${props.fontSize || "base"})`};
    font-weight: ${(props: TypographyProps) => props.fontWeight || 400};
    text-align: ${(props: TypographyProps) => props.textAlign || "inherit"};
    color: ${(props: TypographyProps) => `var(--color-${props.color || "dark"})`};
    line-height: var(--typography--lineHeight-xsmall);
    text-decoration: ${(props: TypographyProps) => props.textDecoration || "none"}
    `;