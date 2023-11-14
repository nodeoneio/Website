'use client';

import { ImHome } from 'react-icons/im';

import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';

export type ProducerType = {
    _id: string;
    owner: string;
    rank: number;
    total_votes: string;
    producer_key: string;
    is_active: number;
    url: string;
    unpaid_blocks: number;
    last_claim_time: string;
    location_code: number;
    candidate_name?: string;
    logo_svg?: string;
    logo_png?: string;
    location?: string;
    // country?: string;
};

export const columns: ColumnDef<ProducerType>[] = [
    {
        accessorKey: 'rank',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Rank
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-[50%] text-center">{row.getValue('rank')}</div>
        ),
    },
    {
        accessorKey: 'logo_png',
        header: 'Logo',
        cell: ({ row }) => (
            <div className="flex h-[32px] w-[32px] rounded-full bg-white text-secondary-500 items-center justify-center p-1 text-center">
                {row.getValue('logo_png') ? (
                    <img
                        src={row.getValue('logo_png')}
                        alt={(row.getValue('candidate_name') as string)
                            .charAt(0)
                            .toUpperCase()}
                        width={24}
                        height={24}
                    />
                ) : row.getValue('logo_svg') ? (
                    <Image
                        src={row.getValue('logo_png')}
                        alt={(row.getValue('candidate_name') as string)
                            .charAt(0)
                            .toUpperCase()}
                        width={24}
                        height={24}
                    />
                ) : (
                    <p>
                        {(row.getValue('candidate_name') as string)
                            .charAt(0)
                            .toUpperCase()}
                    </p>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'candidate_name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('candidate_name')}</div>
        ),
    },

    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => (
            <Link
                href={row.getValue('url')}
                target="_blank"
            >
                <ImHome />
            </Link>
        ),
    },

    {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('location')}</div>
        ),
    },
    // {
    //     accessorKey: 'country',
    //     header: 'Country',
    //     cell: ({ row }) => (
    //         <div className="capitalize">{row.getValue('country')}</div>
    //     ),
    // },
    {
        accessorKey: 'total_votes',
        header: () => <div className="text-right">Total Votes</div>,
        cell: ({ row }) => {
            const total_votes = parseFloat(row.getValue('total_votes'));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(total_votes);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
];

export default function ProducerTable({
    data,
    setCurrentPage,
    setPageSize,
    currentPage,
    pageSize,
    totalCount,
}: {
    data: ProducerType[];
    setCurrentPage: (page: number) => void;
    setPageSize: (page: number) => void;
    currentPage: number;
    pageSize: number;
    totalCount: number;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 30,
            },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const totalPageNumArray = Array.from(
        Array(Math.ceil(totalCount / pageSize))
    ).map((e, i) => i + 1);

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Validator Name..."
                    value={
                        (table
                            .getColumn('candidate_name')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('candidate_name')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm text-secondary-500"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    {totalPageNumArray.map((num) => (
                        <Button
                            key={num}
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(num)}
                            disabled={currentPage === num}
                        >
                            {num}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage ===
                            totalPageNumArray[totalPageNumArray.length - 1]
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
