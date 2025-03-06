import { Trans } from "@lingui/react/macro";
import { Typography } from "~/components/Typography";
import { StyledProductSelector } from "./ProductSelector.styled";
import { LoadingSpinner } from "~/components/LoadingSpinner";

export function ProductSelectorLoading() {
    return <StyledProductSelector>
        <Typography textAlign="center" fontSize="larger" fontWeight="400">
            <Trans>
                Searching the best products for you
            </Trans>
        </Typography>
        <LoadingSpinner size="medium" />
    </StyledProductSelector>
}