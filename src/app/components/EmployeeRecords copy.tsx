"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { BiEdit, BiX } from "react-icons/bi";

const EmployeeRecords = () => {
  const data = useMemo(
    () => [
      {
        image: "https://placeimg.com/192/192/people",
        name: "Harrish",
        username: "harrish",
        country: "India",
        email: "harrish@harrish",
        accountType: "Admin",
      },
    ],
    []
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "image",
        header: "PHOTO",
        enableSorting: false,
        cell: ({ getValue }) => (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={getValue<string>()} alt="Avatar" />
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "NAME",
      },
      {
        accessorKey: "username",
        header: "USERNAME",
      },
      {
        accessorKey: "country",
        header: "COUNTRY",
      },
      {
        accessorKey: "email",
        header: "EMAIL",
      },
      {
        accessorKey: "accountType",
        header: "ACCOUNT TYPE",
      },
      {
        accessorKey: "action",
        header: "ACTION",
        enableSorting: false,
        cell: () => (
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-xs">
              <BiEdit />
            </button>
            <button className="btn btn-ghost btn-xs">
              <BiX />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto h-full">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <button className="ml-2">
                        {header.column.getIsSorted() === "asc"
                          ? "🔼"
                          : header.column.getIsSorted() === "desc"
                          ? "🔽"
                          : "⇅"}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeRecords;
