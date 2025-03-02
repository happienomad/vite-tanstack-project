import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { Controller, useForm } from "react-hook-form";
import { Card } from "~/components/Card";
import Input from "~/components/Input";
import { Typography } from "~/components/Typography";
import { Applicant, ApplicantSchema, Application } from "~/global/types/application";
import { StyledForm } from "./ApplicationForm.styled";
import Button from "~/components/Button";
import { InputValidation } from "~/components/InputValidation";
import { useMutation } from "@tanstack/react-query";
import { postData } from "~/api/fetch";

export interface ApplicationFormProps {
    applicant: Applicant;
    applicationId: string;
}

export function ApplicationForm({ applicant, applicationId }: ApplicationFormProps) {

    const { formState, control, handleSubmit } = useForm<Applicant>({
        defaultValues: applicant,
        reValidateMode: "onBlur",
        resolver: zodResolver(ApplicantSchema)
    });

    const { mutate: updateApplication } = useMutation({
        mutationKey: ["createApplication"],
        mutationFn: (body: Partial<Application>) => postData(`applications/${applicationId}`, JSON.stringify(body), "PUT"),
        onSuccess: (data) => {
            console.log("Updated::", data);
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
                        <Controller control={control} name="firstName"
                            render={({ field: { onChange, value } }) => {
                                return <Input onChange={onChange} value={value} />
                            }}
                        />
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
                        <Controller control={control} name="lastName"
                            render={({ field: { onChange, value } }) => {
                                return <Input onChange={onChange} value={value} />
                            }}
                        />
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
                        <Controller control={control} name="email"
                            render={({ field: { onChange, value } }) => {
                                return <Input onChange={onChange} value={value} />
                            }}
                        />
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
                        <Controller control={control} name="phone"
                            render={({ field: { onChange, value } }) => {
                                return <Input onChange={onChange} value={value} />
                            }}
                        />
                        {
                            formState.errors.phone &&
                            <InputValidation message={formState.errors.phone.message} />
                        }
                    </StyledForm.Input>
                </StyledForm.Field>
                <StyledForm.ButtonContainer>
                    <Button type="submit">
                        Submit
                    </Button>
                </StyledForm.ButtonContainer>
            </StyledForm.Form>
        </Card>
    )
}