/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';


const HeadingVariantsEnum = z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const TypographySizesEnum = z.enum(['xsmall', 'small', 'base', 'medium', 'large', 'larger', 'largest', 'extravagant']);

const TypographyWeightEnum = z.enum(['300', '400', '600', '700']);

const TypographyTextCaseEnum = z.enum(["uppercase", "lowercase", "capitalize"]);

const TypographyColorEnum = z.enum(["primary", "secondary", "danger", "warning", "info", "success"]);

const TypographyTextAlignEnum = z.enum(["left", "center", "right"]);

const TypographyTextDecorationEnum = z.enum(["line-through", "undeline", "overline", "none"]);

export type HeadingVariantsType = z.infer<typeof HeadingVariantsEnum>;

export type BaseTypographyType = {
    color?: z.infer<typeof TypographyColorEnum>,
    fontSize?: z.infer<typeof TypographySizesEnum>,
    fontWeight?: z.infer<typeof TypographyWeightEnum>,
    textCase?: z.infer<typeof TypographyTextCaseEnum>,
    textAlign?: z.infer<typeof TypographyTextAlignEnum>,
    textDecoration?: z.infer<typeof TypographyTextDecorationEnum>
}