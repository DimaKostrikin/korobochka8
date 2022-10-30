import { useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "./ui/Input/Input";
import { Table } from "./ui/Table/Table";
import { OverlayProvider, OverlayContainer } from "react-aria";
import { Example } from "./ui/Popover/popover";
const Container = styled.div`
  background-color: #ffffff;
  width: 1000px;
  height: 100vh;
  padding: 8px;
`;

const App = () => {
  const [value, setValue] = useState("");
  const overlayRef = useRef();

  return (
    <Container>
      <Table />
      <div>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <Example />
    </Container>
  );
};

export default App;
