import { useSuspenseQuery } from "@tanstack/react-query";
import { applicationsQueryOptions } from "~/api/queries/queryOptions";
import { useProducts } from "~/global/hooks/useProducts";
import { Trans } from "@lingui/react/macro";
import { Application } from "~/global/types/application";
import { Link } from "@tanstack/react-router";
import { Table } from "~/components/Table";
import { StyledApplicationList } from "./ApplicationList.styled";


interface ApplicationsTableRowsProps {
    applications: Application[];
}

export function ApplicationsList() {

    const { data: applications } = useSuspenseQuery(applicationsQueryOptions());
  
    return (
      <StyledApplicationList.Container>
        <StyledApplicationList.OverflowContainer>
            <Table>
                <Table.THead>
                    <tr>
                    <td>
                        <Trans>Date created</Trans>
                    </td>
                    <td>
                        <Trans>Product Name</Trans>
                    </td>
                    <td>
                        <Trans>Applicant Name</Trans>
                    </td>
                    <td>
                        <Trans>Applicant email</Trans>
                    </td>
                    <td>
                        <Trans>Applicant phone</Trans>
                    </td>
                    <td>
                        <Trans>Actions</Trans>
                    </td>
                    </tr>
                </Table.THead>
                <Table.TBody>
                    <ApplicationsTableRows applications={applications } />
                </Table.TBody>
            </Table>
        </StyledApplicationList.OverflowContainer>
      </StyledApplicationList.Container>
    )
  }

  function ApplicationsTableRows({ applications } : ApplicationsTableRowsProps) {
    
        const productMap = useProducts();

        const completedApplications = applications.filter((application) => {
            if(!application.productId) {
                return;
            }

            const applicant = application.applicants[0];

            // Condition to check if application is valid
            return applicant && applicant.email;
        })
        
        return (
            <>
                {
                    completedApplications.map((application) => {
                        const applicant = application.applicants[0];
                        const product = productMap[application.productId || ""];
                        return (
                            <tr key={application.id}>
                                <td>{application.createdAt}</td>
                                <td>{product.name}</td>
                                <td>{applicant.firstName} {applicant.lastName}</td>
                                <td>{applicant.email}</td>
                                <td>{applicant.phone}</td>
                                <td>
                                    <Link 
                                        to="/applications/$applicationId" 
                                        params={{ applicationId: application.id }} 
                                    >
                                        <Trans>Edit</Trans>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        )
  }