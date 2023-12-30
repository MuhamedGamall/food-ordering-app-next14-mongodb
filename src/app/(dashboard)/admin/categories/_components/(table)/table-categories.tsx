"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Edit,
  Loader,
  MoreHorizontal,
  Trash2,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import {
  deleteCategory,
  editCategory,
} from "@/lib/RTK/slices/categories-slice";

import { columns } from "./table-column";
import HandleLoader from "@/components/loader";
import SearchInputs from "./search-inputs";
import DeleteActionsBtns from "./delete-actions";

export type Catygory = {
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export function DataTable({
  data,
  tableLoading,
}: {
  data: any;
  tableLoading: boolean;
}) {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [inputValue, setinputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
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

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const idsSelectedToDelete = selectedRows.map((row) => row.original._id);

  const isEditing = (rowId: string) => editingRowId === rowId;

  // handle actions functoins
  const handleEditClick = (rowId: string) => {
    isEditing(rowId) ? setEditingRowId(null) : setEditingRowId(rowId);
  };

  const handleSaveClick = async ({
    _id,
    currentTitle,
  }: {
    _id: string;
    currentTitle: string;
  }) => {
    if (inputValue.length !== 0 || currentTitle.length) {
      dispatch(editCategory({ _id, title: inputValue || currentTitle }));
      setEditingRowId(null);
    } else toast.error("Invaild input value");
  };
  const handleDeleteClick = async (_id: string) => {
    if (_id) {
      dispatch(deleteCategory([_id]));
      setEditingRowId(null);
      table.resetRowSelection(false);
      table.toggleAllRowsSelected(false);
    }
  };

  return (
    <div className="w-full mt-5">
      {isLoading || (tableLoading && <HandleLoader />)}
      <div className="flex items-center justify-between gap-1 py-4">
        <div className="flex items-center gap-1">
          <SearchInputs dataLength={data?.length} table={table} />
          <DeleteActionsBtns
            dispatch={dispatch}
            table={table}
            setIsLoading={setIsLoading}
            idsSelectedToDelete={idsSelectedToDelete}
            data={data}
            isLoading={isLoading}
          />
        </div>
        <div className="bg-slate-100 rounded-md p-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {isEditing(row.id) ? (
                    <TableCell colSpan={columns.length}>
                      <div className="flex gap-1 ">
                        <Input
                          className="grow"
                          defaultValue={row.original.title}
                          onChange={(e) => setinputValue(e.target.value)}
                        />
                        <Button
                          type="button"
                          className="text-[18px] text-slate-600 hover:bg-slate-300/20 bg-slate-400/20"
                          onClick={() =>
                            handleSaveClick({
                              _id: row?.original._id,
                              currentTitle: row.original.title,
                            })
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </TableCell>
                  ) : (
                    row
                      .getVisibleCells()
                      .map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))
                  )}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(row.original._id)
                          }
                        >
                          Copy catygory ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {!isEditing(row.id) && (
                          <DropdownMenuItem
                            onClick={() => handleEditClick(row.id)}
                          >
                            <div className="flex items-center gap-1 text-[16px]">
                              <Edit className="w-4" />
                              Go to edit mood
                            </div>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <div
                            className="flex items-center gap-1 text-[16px]"
                            onClick={() => handleDeleteClick(row.original._id)}
                          >
                            <Trash2 className="w-4" />
                            Delete
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  {tableLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
