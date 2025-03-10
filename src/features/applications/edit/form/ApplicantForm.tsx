import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { Trans, useLingui } from "@lingui/react/macro";
import { Card } from "~/components/Card";
import Input from "~/components/Input";
import { Typography } from "~/components/Typography";
import { Applicant } from "~/global/types/application";
import { StyledForm } from "./ApplicantForm.styled";
import Button from "~/components/Button";
import { InputValidation } from "~/components/InputValidation";
import { useToast } from "~/global/providers/ToastProvider";
import { checkForValidEmail, validatePhoneNumber } from "./utils";
import { InputPhone } from "~/components/InputPhone";

export interface ApplicationFormProps extends PropsWithChildren {
    applicant: Applicant;
    onSubmit: (data: Applicant) => void;
    isUpdatePending?: boolean;

}

export function ApplicantForm({ applicant, onSubmit, children, isUpdatePending }: ApplicationFormProps) {
    
    const { formState, reset, handleSubmit, register } = useForm<Applicant>({
        mode: "all",
        defaultValues: applicant,
        values: applicant,
        reValidateMode: "onSubmit"
    });

    console.log({ applicant });

    const { showToast } = useToast();

    const { t } = useLingui();

    const onError = () => {
        showToast({
            message: t`Please enter valid information and try again`,
            status: "error"
        });
    } 

    return (
        <Card padding="large" variant="full">
            {children}
            <Typography fontSize="medium" fontWeight="600">
                <Trans>
                    Main Applicant Information
                </Trans>
            </Typography>
            <StyledForm.Form aria-label="applicantForm" onSubmit={handleSubmit(onSubmit, onError)}>
                <StyledForm.Field>
                    <StyledForm.Label>
                        <label htmlFor="firstName">
                            <Trans>First Name:</Trans>
                        </label>
                    </StyledForm.Label>
                    <StyledForm.Input>
                        <Input placeholder="First Name" id="firstName" {...register("firstName", {
                            required: {
                                value: true,
                                message: t`Please enter your first name`
                            }
                        })} />
                        {
                            formState.errors.firstName &&
                            <InputValidation message={formState.errors.firstName.message} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.Field>
                    <StyledForm.Label>
                        <label htmlFor="lastName">
                            <Trans>Last Name:</Trans>
                        </label>
                    </StyledForm.Label>
                    <StyledForm.Input>
                        <Input placeholder="Last Name" id="lastName" {...register("lastName", {
                            required: {
                                value: true,
                                message: t`Please enter your last name`
                            }
                        })} />
                        {
                            formState.errors.lastName &&
                            <InputValidation message={formState.errors.lastName.message} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.Field>
                    <StyledForm.Label>
                        <label htmlFor="email">
                            <Trans>email address:</Trans>
                        </label>
                    </StyledForm.Label>
                    <StyledForm.Input>
                        <Input placeholder="test@example.com" id="email" type="email" {...register("email", {
                            required: {
                                value: true,
                                message: t`Please enter your email address`
                            },
                            validate: (value) => checkForValidEmail(value, t`Please enter a valid email address`)
                        })} />
                        {
                            formState.errors.email &&
                            <InputValidation message={formState.errors.email.message} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.Field>
                    <StyledForm.Label>
                        <label htmlFor="phone">
                            <Trans>Phone number:</Trans>
                        </label>
                    </StyledForm.Label>
                    <StyledForm.Input>
                        <InputPhone placeholder="(***) ***-****" id="phone" type="tel" {...register("phone", {
                            required: {
                                value: true,
                                message: t`Please enter your phone number`
                            },
                            validate: (value: string) => validatePhoneNumber(value, t`Phone Number must be exactly 10 digits`)
                        })} />
                        {
                            formState.errors.phone &&
                            <InputValidation message={formState.errors.phone.message as string} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.ButtonContainer>
                    <Button type="reset" variant="secondary" onClick={() => reset()}>
                        <Trans>Reset</Trans>
                    </Button>
                    <Button type="submit" disabled={!formState.isValid || isUpdatePending}>
                        {
                            isUpdatePending ? <Trans>Saving</Trans> : <Trans>Save</Trans>
                        }
                    </Button>
                </StyledForm.ButtonContainer>
            </StyledForm.Form>
        </Card>
    )
}