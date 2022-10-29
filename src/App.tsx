import { useState } from "react";
import styled from "styled-components";
import { Input } from "./ui/Input/Input";
import { Table } from "./ui/Table/Table";

const Container = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Table />
      <div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errorMessage="Логин не существует"
        />
      </div>
    </Container>
  );
};

export default App;
