import { useEffect, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

export default function ReactTableUsers() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState([]);

    // Fetch users
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => setUsers(json));
    }, []);

    // Columns
    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id" },
            { header: "Name", accessorKey: "name" },
            { header: "Username", accessorKey: "username" },
            { header: "Email", accessorKey: "email" },
            { header: "Phone", accessorKey: "phone" },
            { header: "Website", accessorKey: "website" },
            {
                header: "Company",
                accessorFn: (row) => row.company?.name,
            },
            {
                header: "City",
                accessorFn: (row) => row.address?.city,
            },
        ],
        []
    );

    // Initialize Table
    const table = useReactTable({
        data: users,
        columns,
        state: {
            sorting,
            globalFilter: filter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">Users Table</h2>

            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="search"
                    placeholder="Search..."
                    className="form-control"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {/* Table */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{ cursor: "pointer" }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {" "}
                                    {{
                                        asc: "▲",
                                        desc: "▼",
                                    }[header.column.getIsSorted()] || ""}
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

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">

                {/* Page size select */}
                <select
                    className="form-select"
                    style={{ width: 100 }}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>

                {/* Page navigation */}
                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Prev
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>

                {/* Page number */}
                <span>
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} /{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </div>
    );
}
