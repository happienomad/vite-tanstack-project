import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { useForm } from "react-hook-form";
import { Card } from "~/components/Card";
import Input from "~/components/Input";
import { Typography } from "~/components/Typography";
import { Applicant, ApplicantSchema, Application } from "~/global/types/application";
import { StyledForm } from "./ApplicationForm.styled";
import Button from "~/components/Button";
import { InputValidation } from "~/components/InputValidation";
import { useMutation } from "@tanstack/react-query";
import { postData } from "~/api/fetch";
import { useRouter } from "@tanstack/react-router";

export interface ApplicationFormProps {
    applicant: Applicant;
    applicationId: string;
}

export function ApplicationForm({ applicant, applicationId }: ApplicationFormProps) {
    
    const { formState, handleSubmit, register } = useForm<Applicant>({
        defaultValues: applicant,
        values: applicant,
        reValidateMode: "onBlur",
        resolver: zodResolver(ApplicantSchema)
    });

    const { navigate } = useRouter();

    const { mutate: updateApplication } = useMutation({
        mutationKey: ["createApplication"],
        mutationFn: (body: Partial<Application>) => postData(`applications/${applicationId}`, JSON.stringify(body), "PUT"),
        onSuccess: (data) => {
            if(data) {
                void navigate({
                    to: "/applications"
                })
            }
        }
    })

    const onSubmit = (data: Applicant) => {
        updateApplication({
            applicants: [data]
        })
    }

    return (
        <Card padding="large" variant="full">
            <Typography fontSize="medium" fontWeight="600">
                <Trans>
                    Main Applicant Information
                </Trans>
            </Typography>
            <StyledForm.Form onSubmit={handleSubmit(onSubmit)}>
                <StyledForm.Field>
                    <StyledForm.Label>
                        <label htmlFor="firstName">
                            <Trans>First Name:</Trans>
                        </label>
                    </StyledForm.Label>
                    <StyledForm.Input>
                        <Input id="firstName" {...register("firstName")} />
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
                        <Input id="lastName" {...register("lastName")} />
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
                        <Input id="email" type="email" {...register("email")} />
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
                        <Input id="phone" type="tel" {...register("phone")} />
                        {
                            formState.errors.phone &&
                            <InputValidation message={formState.errors.phone.message} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.ButtonContainer>
                    <Button type="submit" disabled={formState.isSubmitting}>
                        {
                            formState.isSubmitting ? <Trans>Saving</Trans> : <Trans>Save</Trans>
                        }
                    </Button>
                </StyledForm.ButtonContainer>
            </StyledForm.Form>
        </Card>
    )
}