import { useEffect, useState } from "react";
import { Column, Row } from "react-table";

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  disabled,
  updateMyData // This is a custom function that we supplied to our table instance
}: {
  value: string;
  row: Row;
  column: Column;
  disabled: boolean;
  updateMyData: (index: number, id: string, value: string) => void;
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      disabled={disabled}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
