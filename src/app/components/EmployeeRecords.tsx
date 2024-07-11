"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import { redirect, useRouter } from "next/navigation";

const EmployeeRecords = () => {
  // const data = useMemo(
  //   () => [
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "Harrish",
  //       username: "harrish",
  //       country: "India",
  //       email: "harrish@harrish",
  //       accountType: "Admin",
  //     },
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "Harrish",
  //       username: "harrish",
  //       country: "India",
  //       email: "harrish@harrish.com",
  //       accountType: "Admin",
  //     },
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "John Doe",
  //       username: "johndoe",
  //       country: "USA",
  //       email: "john.doe@example.com",
  //       accountType: "User",
  //     },
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "Jane Smith",
  //       username: "janesmith",
  //       country: "UK",
  //       email: "jane.smith@example.com",
  //       accountType: "User",
  //     },
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "Carlos Diaz",
  //       username: "carlosdiaz",
  //       country: "Spain",
  //       email: "carlos.diaz@example.com",
  //       accountType: "Admin",
  //     },
  //     {
  //       image: "https://placeimg.com/192/192/people",
  //       name: "Anna Ivanova",
  //       username: "annaivanova",
  //       country: "Russia",
  //       email: "anna.ivanova@example.com",
  //       accountType: "User",
  //     },
  //   ],
  //   []
  // );
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    const fetchRecords = async () => {
      const records = await fetch("/api/records");
      const result = await records.json();
      if (result && result.success) {
        setData(
          result.records.map(({ records }) => ({
            ...records,
            name: records.firstName + " " + records.lastName,
          }))
        );
      }
    };
    fetchRecords();
  }, []);
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
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => {
                const id = row.original.id;
                router.push(`/edit/${id}`);
              }}
            >
              <BiEdit />
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={async () => {
                const id = row.original.id;
                const res = await fetch(`/api/records/delete/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                const data = await res.json();
                if (data.success) {
                  window.location.reload();
                }
              }}
            >
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
    <div className="overflow-x-auto  flex flex-col p-4 outline rounded-lg h-fit">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center p-2">
          {" "}
          <span className="text-xs">Show</span>{" "}
          <select className="select select-xs" defaultValue={10}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-xs"> entries</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Search</span>
          <input className="input input-xs"></input>
          <button>
            <BiSearch size={20} />
          </button>
        </div>
      </div>

      <table className="table ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
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
