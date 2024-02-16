// DashboardTable.js
import React from "react";
import { useTable } from "react-table";

const DashboardTable = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Toy Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Actions",
        accessor: "id", // Use toy ID as accessor for actions
        Cell: ({ value }) => (
          <div className="flex space-x-2">
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={() => onEdit(value)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline focus:outline-none"
              onClick={() => onDelete(value)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="w-full border-collapse border border-gray-300">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="p-3 border border-gray-300 bg-gray-100">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-3 border border-gray-300">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardTable;
