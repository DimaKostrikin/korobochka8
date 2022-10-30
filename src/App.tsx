import { useState } from "react";
import styled from "styled-components";
import { Input } from "./ui/Input/Input";
import { Option, Select } from "./ui/Select/Select";
import { Table } from "./ui/Table/Table";

const Container = styled.div`
  background-color: #ffffff;
  width: 1000px;
  height: 100vh;
  padding: 8px;
`;

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Table />
      <div>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <Select>
        <Option key={"1"}>1</Option>
      </Select>
    </Container>
  );
};

export default App;
