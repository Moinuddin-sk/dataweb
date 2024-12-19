"use client";
import { CSSProperties } from "react";
import styles from "./table-header.module.scss";
export interface TableHeaderProps {
  align?: "left" | "right" | "center";
  label: string;
  headerInfo?: string;
  fixed?: "left" | "right";
  colSpan?: number;
  groupBy?: string;
  cssClass?: string;
}

export const TableHeader = ({
  align = "left",
  label,
  fixed,
  colSpan,
  groupBy,
  cssClass,
}: TableHeaderProps) => {
  const alicenter = { left: "flex-start", center: "center", right: "flex-end" };
  return (
    <th
      className={`${styles["table_header"]} ${
        !fixed ? "" : fixed === "left" ? styles.fixed_left : styles.fixed_right
        } ${cssClass ? styles[cssClass] : ""}`}
      style={
        {
          textAlign: align,
          "--border-width": (colSpan && colSpan > 1) || groupBy ? "1px" : 0,
        } as CSSProperties
      }
      colSpan={colSpan || 1}>
      <div
        className={`${styles.header_container}`}
        style={{ justifyContent: alicenter[align] }}>
        <h6>{label}</h6>
      </div>
    </th>
  );
};
