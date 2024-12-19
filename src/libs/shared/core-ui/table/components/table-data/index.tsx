/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import { useState } from "react";
import styles from "./table-data.module.scss";
import { HeaderProps, TableChildProps } from "../../models/table.model";
import { Checkbox } from "antd";
const alignOptions = {
  left: "left",
  center: "center",
  right: "right",
};
export const TableData = <T extends {}, K extends keyof T>({
  headers,
  list,
  childrenKey,
  uniqueKey,
  index,
  onSelect,
  selected,
}: {
  headers: HeaderProps<T, K>[];
  list: T;
  childrenKey?: keyof T;
  TableChild?: ({ data }: TableChildProps<T>) => JSX.Element;
  uniqueKey: keyof T;
  index: number;
  onSelect?: (list: T) => void;
  selected?: T[];
}) => {
  const [expand, setExpand] = useState(false);
  
  return (
    <tr
      key={(list?.[uniqueKey] + "") as string}
      data-index={index}
      className={`${styles.tr}  ${index % 2 ? styles.even_row : ""}`}
      style={
        expand && index % 2 === 0 && childrenKey
          ? { border: "0px solid var(--bs-dark)", borderBottom: "0px solid" }
          : {}
      }>
      {onSelect && (
        <td className={`${styles["w-checkbox"]} ${styles.td}`}>
          <div>
            <Checkbox
              checked={
                !!selected?.find?.((el) => el[uniqueKey] === list[uniqueKey])
              }
              style={{ color: "var(--bs-dark)" }}
              onClick={() => {
                onSelect(list);
              }}
            />
          </div>
        </td>
      )}
      {headers.map((header, index) => {
        const style = {
          "--row-align": alignOptions[header?.align || "left"],
          gap: "10px",
        };
        const value: string = (list?.[header?.field as K] as string) || "";
        const selectorValue = header?.selector ? header?.selector(list) : value;
        return (
          <td
            className={`${styles.td} ${
              !header.fixed
                ? ""
                : header.fixed === "left"
                ? styles.fixed_left
                : styles.fixed_right
              } ${header?.cssClass ? styles[header?.cssClass] : ""}`}
            key={`column-${header.field as string}`}>
            <div style={style as React.CSSProperties}>
              {index === 0 &&
                childrenKey &&
                ((list?.[childrenKey] || []) as string[])?.length !== 0 && (
                  <i
                    className={`icon-arrow ${styles.expand_arrow} ${
                      !expand ? styles.close : ""
                    }`}
                    onClick={() => setExpand((prev) => !prev)}
                  />
                )}
              {header?.Component ? (
                <header.Component data={list} accessLabel={header.field} />
              ) : (
                selectorValue
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
};
