import { ChangeEventHandler } from "react";
import { useFocusRing } from "react-aria";
import styled from "styled-components";
import { palette } from "../colors";

const InputContainer = styled.div`
  display: grid;
`;

const InputTag = styled.input<{ isFocus?: boolean; isError?: boolean }>`
  outline-style: none;
  appearance: none;
  border-color: green;
  box-sizing: border-box;
  font-family: Golos;
  font-size: 16px;
  line-height: inherit;
  margin: 0;
  border: 1px solid #c5c8d0;
  padding: 16px;
  border-radius: 4px;
  ${(props) =>
    props.isFocus
      ? `
  box-shadow: ${palette.blue30} 0 0 0 3px;
  `
      : ""}
  ${(props) =>
    props.isError
      ? `
      box-shadow: ${palette.error60} 0 0 0 3px;
      `
      : ""}
`;

const ErrorSpan = styled.span`
  font-size: 12px;
  margin-top: 1px;
  font-family: Golos;
  font-weight: bold;
  color: ${palette.error60};
`;

export const Input = ({
  value,
  placeholder,
  errorMessage,
  onChange
}: {
  value?: string | number;
  placeholder?: string;
  errorMessage?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  const { focusProps, isFocusVisible: isFocus, isFocused } = useFocusRing();
  console.log(isFocus);
  return (
    <InputContainer>
      <InputTag
        isFocus={isFocus || isFocused}
        isError={Boolean(errorMessage)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...focusProps}
      />
      {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
    </InputContainer>
  );
};
