import { z } from "zod";

export const ScreenSizesEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

export type ScreenSizesType = z.infer<typeof ScreenSizesEnum>;