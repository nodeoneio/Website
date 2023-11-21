'use client';

import { ImHome } from 'react-icons/im';
import { spinner } from '@/public/assets/icons';
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
    chainId: string;
    total_producer_vote_weight: string;
    rows: bpInfoType[];
};

export type columnDataType = {
    name: string;
    rank: number;
    logo: string;
    url: string;
    location: string;
    total_votes: number;
};

export type bpInfoType = {
    owner: string;
    rank: number;
    total_votes: string;
    producer_key: string;
    is_active: number;
    url: string;
    unpaid_blocks: number;
    last_claim_time: string;
    location_info: string;
    bpjson: bpJsonType;
};

export type bpJsonType = {
    producer_account_name: string;
    org: {
        candidate_name: string;
        website: string;
        code_of_conduct: string;
        ownership_disclosure: string;
        email: string;
        github_user: string | string[];
        branding: {
            logo_256: string;
            logo_1024: string;
            logo_svg: string;
        };
        location: {
            name: string;
            country: string;
            latitude: number;
            longitude: number;
        };
        social: {
            steemit: string;
            twitter: string;
            github: string;
            keybase: string;
            telegram: string;
        };
    };
    nodes: [
        {
            location: {
                name: string;
                country: string;
                latitude: number;
                longitude: number;
            };
            node_type: string[];
            p2p_endpoint: string;
            api_endpoint: string;
            ssl_endpoint: string;
        }
    ];
};

// 투표량 반올림 자릿수
let pow = 0;

export const columns: ColumnDef<columnDataType>[] = [
    //   export const columns: ColumnDef<bpInfoType>[] = [
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
        accessorKey: 'logo',
        header: 'Logo',
        cell: ({ row }) => (
            <div className="flex h-[32px] w-[32px] rounded-full bg-white text-secondary-500 items-center justify-center p-[5px] text-center">
                {row.getValue('logo') ? (
                    <img
                        src={row.getValue('logo')}
                        alt={(row.getValue('name') as string)
                            .charAt(0)
                            .toUpperCase()}
                        width={24}
                        height={24}
                    />
                ) : (
                    <p>
                        {row.getValue('name')
                            ? (row.getValue('name') as string)
                                  .charAt(0)
                                  .toUpperCase()
                            : ''}
                    </p>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'name',
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
            <div className="lowercase">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => (
            <div>
                {row.getValue('url') ? (
                    <Link
                        href={row.getValue('url')}
                        target="_blank"
                    >
                        <ImHome />
                    </Link>
                ) : (
                    ''
                )}
            </div>
        ),
    },
    {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('location')}</div>
        ),
    },
    {
        accessorKey: 'total_votes',
        header: () => <div className="text-right">Total Votes</div>,
        cell: ({ row }) => {
            const total_votes = parseFloat(row.getValue('total_votes'));
            let total_votes_diaplay = Math.round(total_votes);
            const vote_length = total_votes.toString().length;

            if (vote_length > 8) {
                pow = pow === 0 ? total_votes.toString().length - 8 : pow;
                total_votes_diaplay =
                    Math.round(total_votes / Math.pow(10, pow));
            }

            return (
                <div className="text-right font-medium">
                    {total_votes_diaplay.toLocaleString()}
                </div>
            );
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
    isLiveInfoLoading,
}: {
    data: columnDataType[];
    setCurrentPage: (page: number) => void;
    setPageSize: (page: number) => void;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    isLiveInfoLoading: boolean;
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
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Filter Validator Name..."
                    value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('name')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm text-secondary-500"
                />
                {isLiveInfoLoading ? (
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            src={spinner}
                            alt="spinner"
                            width={30}
                            height={30}
                        />
                        Loading...
                    </div>
                ) : (
                    ''
                )}
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
