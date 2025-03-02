import { Trans } from "@lingui/react/macro";
import { Typography } from "~/components/Typography";
import { StyledProductSelector } from "./ProductSelector.styled";

export function ProductSelectorLoading() {
    return <StyledProductSelector>
        <Typography fontSize="larger" fontWeight="400">
            <Trans>
                Searching the best products for you
            </Trans>
        </Typography>
    </StyledProductSelector>
}