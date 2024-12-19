/* eslint-disable @typescript-eslint/no-empty-object-type */
import { TableProps } from "../../models/table.model";
import { TableData } from "../table-data";

export const TableRow = <T extends {}, K extends keyof T>({
  headers = [],
  data = [],
  uniqueKey,
  onSelect,
  selected,
  TableChild,
  childrenKey,
}: TableProps<T, K>) => {
  
  return (
    <tbody>
      {data?.map?.((list: T, index) => (
        <TableData
          key={(list?.[uniqueKey] || `${index}`) as string}
          headers={headers}
          list={list}
          uniqueKey={uniqueKey}
          index={index}
          onSelect={onSelect}
          selected={selected}
          TableChild={TableChild}
          childrenKey={childrenKey}
        />
      ))}
    </tbody>
  );
};
