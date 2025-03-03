import { useSuspenseQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { applicationsQueryOptions } from "~/api/queries/queryOptions";

const StyledTable = {
    Container: styled.div`
        position: relative;
        border: 1px solid var(--color-dark-300);
        border-radius: 10px;
        overflow: hidden;
    `,
    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    `,
    Thead: styled.thead`
    `
}

export function ApplicationsList() {

    const { data: applications } = useSuspenseQuery(applicationsQueryOptions());
  
    return (
      <StyledTable.Container>
        <StyledTable.Table>
          <thead>
            <tr>
              <td>
                Date created
              </td>
              <td>
                Product Name
              </td>
              <td>
                Applicant Name
              </td>
              <td>
                Applicant email
              </td>
              <td>
                Applicant phone
              </td>
              <td>
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
              {
                applications.map((application) => {
                  const applicant = application.applicants[0];
                  return (
                    <tr key={application.id}>
                      <td>{application.createdAt}</td>
                      <td>{application.productId}</td>
                      <td>{applicant.firstName} {applicant.lastName}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.phone}</td>
                      <td></td>
                    </tr>
                  )
                })
              }
          </tbody>
        </StyledTable.Table>
      </StyledTable.Container>
    )
  }