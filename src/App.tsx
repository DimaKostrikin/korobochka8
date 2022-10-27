import styled from "styled-components";
import { Table } from "./ui/Table/Table";

const Container = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <Table />
    </Container>
  );
};

export default App;
