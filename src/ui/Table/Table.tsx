import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Cell, CellProps, Column, Row, useTable } from "react-table";
import styled from "styled-components";
import { EditableCell } from "./TableCell";

type TableColumns = {
  ID: string;
  KPGZ: string;
  SPGZ: string;
  value: string;
  unit: string;
  priceForUnit: string;
  sum: string;
  address: string;
};

const columnsGrowMap = {
  ID: 1,
  KPGZ: 4,
  SPGZ: 4,
  value: 2,
  unit: 2,
  priceForUnit: 2,
  sum: 2,
  address: 4
};

const TableContainer = styled.table`
  border: solid 1px blue;
`;

const Tr = styled.tr<{ odd?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr 1fr 1fr 1fr 2fr;
  background-color: ${(props) => (props.odd ?? false ? "#F1F1F1" : "#FFFFFF")};
`;

const Td = styled.td`
  display: block;
  padding: 16px;
  overflow: auto;
`;

const Th = styled.td`
  display: block;
  padding-left: 16px;
  overflow: auto;
`;

export const Table = () => {
  const [data, setData] = useState([
    {
      ID: "91739664",
      KPGZ: "02.03.03.11 ОБУСТРОЙСТВО ПОКРЫТИЙ И ЭЛЕМЕНТОВ СОПРЯЖЕНИ ТЕРРИТОРИЙ",
      SPGZ: "Устройство покрытия из резиновой кровли в рамках благоустройства территории",
      value: "318,00",
      unit: "Квадратный метр",
      priceForUnit: "3 758, 49",
      sum: "1 195 199, 06",
      address: "Пешеходная Аллея (ЗелАО)"
    },
    {
      ID: "91739664",
      KPGZ: "02.03.03.11 ОБУСТРОЙСТВО ПОКРЫТИЙ И ЭЛЕМЕНТОВ СОПРЯЖЕНИЯ ТЕРРИТОРИЙ",
      SPGZ: "Устройство покрытия из резиновой кровли в рамках благоустройства территории",
      value: "318,00",
      unit: "Квадратный метр",
      priceForUnit: "3 758, 49",
      sum: "1 195 199, 06",
      address: "Пешеходная Аллея (ЗелАО)"
    },
    {
      ID: "91739664",
      KPGZ: "02.03.03.11 ОБУСТРОЙСТВО ПОКРЫТИЙ И ЭЛЕМЕНТОВ СОПРЯЖЕНИЯ ТЕРРИТОРИЙ",
      SPGZ: "Устройство покрытия из резиновой кровли в рамках благоустройства территории",
      value: "318,00",
      unit: "Квадратный метр",
      priceForUnit: "3 758, 49",
      sum: "1 195 199, 06",
      address: "Пешеходная Аллея (ЗелАО)"
    }
  ]);

  const columns = React.useMemo<Column<TableColumns>[]>(
    () => [
      {
        Header: "ID",
        accessor: "ID" // accessor is the "key" in the data
      },
      {
        Header: "КПГЗ",
        accessor: "KPGZ"
      },
      {
        Header: "СПГЗ",
        accessor: "SPGZ"
      },
      {
        Header: "Объем",
        accessor: "value"
      },
      {
        Header: "Ед. измерения",
        accessor: "unit"
      },
      {
        Header: "Цена за ед. ТРУ",
        accessor: "priceForUnit"
      },
      {
        Header: "Сумма",
        accessor: "sum"
      },
      {
        Header: "Адрес",
        accessor: "address"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data
    });

  return (
    <TableContainer {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps()}
                style={{
                  color: "#676767",
                  fontWeight: "medium",
                  textAlign: "left"
                }}
              >
                {column.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <Tr odd={index % 2 === 0} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td {...cell.getCellProps()}>
                    <ContentEditable
                      html={cell.value}
                      onChange={(e) => {
                        setData((prevState) => {
                          return prevState.map((row, index) => {
                            const rowIndex = cell.row.index;
                            const columnId = cell.column.id;
                            return index === rowIndex
                              ? {
                                  ...prevState[rowIndex],
                                  [columnId]: e.target.value
                                }
                              : row;
                          });
                        });
                      }}
                    />
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </tbody>
    </TableContainer>
  );
};
