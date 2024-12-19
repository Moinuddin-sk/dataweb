/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox } from "antd";
import { TableProps } from "../../models/table.model";
import { TableHeader } from "../table-header";
import { TableRow } from "../table-row";
import styles from "./table-list.module.scss";

export const TableList = <T extends {}, K extends keyof T>({
  headers = [],
  data = [],
  onSelect,
  selected,
  loading=true,
  ...props
}: TableProps<T, K>) => {
  return (
    <section
      className={`${styles["table-main-container"]} ${
        data.length == 0 ? styles.no_data : ""
      }`}>
      <table className={styles.table}>
        <thead className={`${styles.thead}`}>
          <tr className={styles.border}>
            {onSelect && (
              <th className={`${styles["w-checkbox"]} ${styles.check_box_headeR}` }>
                <Checkbox
                  checked={
                    data.length !== 0 && selected?.length === data.length
                  }
                  onClick={() => {
                    onSelect(selected?.length === data.length ? [] : data);
                  }}
                />
              </th>
            )}
            {headers.map((header) => (
              <TableHeader
                key={`${header?.field as string}`}
                label={header.label}
                align={header.align}
                headerInfo={header.headerInfo}
                fixed={"left"}
                cssClass={header?.cssClass}
                groupBy={header.groupLabel}
              />
            ))}
          </tr>
        </thead>
        {loading && (
          <tbody className={styles.loader_main}>
            <tr>
              <td
                colSpan={headers.length+1}
                className={styles["loader-container"]}>
                <div className={styles["loader-top"]}></div>
              </td>
            </tr>
          </tbody>
        )}
        {data.length !== 0 && (
          <TableRow
            headers={headers}
            data={data}
            uniqueKey={props.uniqueKey}
            onSelect={onSelect}
            selected={selected}
            childrenKey={props.childrenKey}
            TableChild={props.TableChild}
          />
        )}
      </table>
    </section>
  );
};
