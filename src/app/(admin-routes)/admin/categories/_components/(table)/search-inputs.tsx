import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchInputs({
  dataLength,
  table,
}: {
  dataLength: number;
  table: any;
}) {
  return (
    <>
      <Input
        placeholder="Filter by title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        type="text"
        disabled={!dataLength}
      />
      <Input
        placeholder="Filter by ID..."
        value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("_id")?.setFilterValue(event.target.value)
        }
        type="text"
        disabled={!dataLength}
      />
    </>
  );
}
