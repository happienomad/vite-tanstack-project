import { useLingui } from "@lingui/react/macro";
import { Typography } from "./Typography";

export function InputValidation({ message }: { message?: string }) {
    const { t } = useLingui();
    return <Typography color="danger" fontSize="small" fontWeight="300">
        {message || t`This is a required field`}
    </Typography>
}