import styled from "styled-components";
import { palette } from "../../ui/colors";
import { Table } from "../../ui/Table/Table";

const EstimateContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
`;

const SearchContainer = styled.div`
  box-shadow: ${palette.black};
`;

export const Estimate = () => {
  return (
    <EstimateContainer>
      <SearchContainer></SearchContainer>
      <Table />
    </EstimateContainer>
  );
};
