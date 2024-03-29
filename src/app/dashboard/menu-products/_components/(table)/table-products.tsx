"use client";

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
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAppDispatch } from "@/hooks/redux";

import HandleLoader from "@/components/loader";
import SearchInputs from "./search-inputs";
import DeleteActionsBtns from "./delete-actions";

import { deleteProduct } from "@/lib/RTK/slices/menu-products-slice";
import { columnsFnc } from "./table-column";
import ItemActions from "./item-actions";
import { InitCategoryState, InitProductState } from "../../../../../../types";
import { cn } from "@/lib/utils";

export function DataTable({
  data,
  tableLoading,
  categories,
}: {
  data: any;
  tableLoading: boolean;
  categories: any;
}) {
  const dispatch = useAppDispatch();
  const [selectCategory, setSelectCategory] = useState<any>({
    title: "all",
    _id: "",
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const { columns } = columnsFnc(categories);
// filter by category 
 useEffect(() => {
    const filterByCategory =
      selectCategory?.title !== "all"
        ? data?.filter(
            (el: InitProductState) =>
              el?.category?.category_id === selectCategory?._id
          )
        : data;

    setNewData(filterByCategory);
  }, [data, selectCategory]);

  const table = useReactTable({
    data: newData,
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

  const handleDeleteClick = async (_id: string) => {
    if (_id) {
      dispatch(deleteProduct([_id]));
      table.resetRowSelection(false);
      table.toggleAllRowsSelected(false);
    }
  };

  return (
    <div className="w-full mt-5 relative  rounded-md border p-2">
      {(isLoading || tableLoading) && <HandleLoader />}
      <div className="flex items-center justify-between md:flex-row flex-col-reverse gap-1 ">
        <div className="flex items-center md:justify-start justify-between w-full gap-1">
          <SearchInputs dataLength={data?.length} table={table} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mx-2">
              <Button
                type="button"
                variant="outline"
                className=" px-1"
                size={"sm"}
              >
                Categories
                <ChevronDown className="ml-2 h-4 w-4  hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="capitalize"
                onClick={() => setSelectCategory({ title: "all", _id: "" })}
              >
                <span className="mr-2 h-4 w-4">
                  {selectCategory?.title === "all" && (
                    <Check className={cn("h-4 w-4 opacity-100")} />
                  )}
                </span>
                All categories
              </DropdownMenuItem>
              {categories?.map((el: InitCategoryState) => (
                <DropdownMenuItem
                  className="capitalize"
                  key={el?._id}
                  onClick={() => setSelectCategory(el)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      el?._id === selectCategory?._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {el?.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-1 justify-between w-full">
          <DeleteActionsBtns
            dispatch={dispatch}
            table={table}
            setIsLoading={setIsLoading}
            idsSelectedToDelete={idsSelectedToDelete}
            data={data}
            isLoading={isLoading}
          />
          <div className="bg-slate-100 rounded-md p-1 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="px-1 ">
                <Button
                  size={"sm"}
                  type="button"
                  variant="outline"
                  className="ml-auto"
                >
                  Columns
                  <ChevronDown className="ml-2 h-4 w-4  hidden sm:block" />
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
      </div>
      <hr className="bg-slate-100 h-[1px] my-3" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                <TableRow key={headerGroup.id}>
                  <TableHead className="text-center">#</TableHead>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
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
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell className="flex items-center text-[12px]">
                    # <span className="text-[18px]">{i + 1}</span>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <ItemActions
                      handleDeleteClick={handleDeleteClick}
                      row={row}
                    />
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
