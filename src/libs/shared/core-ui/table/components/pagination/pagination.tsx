import { useMemo } from "react";
import { PaginationProps } from "../../models/table.model";
import styles from "./pagination.module.scss";
import { Select } from "antd";
import { FastForward, RightArrow } from "libs/shared/assets/svg";

export const Pagination = ({
  limit,
  page,
  total,
  onPagination,
  onRowsPerPage,
  removeBorder = false,
}: PaginationProps) => {
  const totalResultInPage = useMemo(() => {
    return total > (page + 1) * limit ? (page + 1) * limit : total;
  }, [limit, page, total]);

  const hideForward = useMemo(() => {
    const pageLimit = total > limit ? limit : total;
    const totalPage = Math.ceil(total / pageLimit) - 1;

    return { allow: page < totalPage && limit < total, totalPage };
  }, [limit, page, total]);

  const allowForward = useMemo(() => {
    return page !== 0;
  }, [page]);

  if (!total) return <></>;

  return (
    <div
      className={`${styles["main-conatiner"]} ${
        removeBorder ? styles.noBorder : ""
      }`}>
      <div className={styles["container"]}>
        <span className={styles.row_info}>Rows per page</span>
        {onRowsPerPage && (
          <Select
            value={limit}
            style={{ width: "60px" }}
            options={[
              { label: "5", value: 5 },
              { label: "10", value: 10 },
              { label: "50", value: 50 },
              { label: "100", value: 100 },
            ]}
            onChange={(value) => {
              onRowsPerPage(value);
            }}
          />
        )}
        <span className={styles.rows}>
          {page * limit + 1} - {totalResultInPage} of {total}
        </span>
        <div className={styles.pagination_control}>
          <FastForward
            className={`${styles["reverse"]} ${
              !allowForward ? styles.disable : ""
            }`}
            onClick={() => {
              if (allowForward) onPagination?.(0);
            }}
          />
          <RightArrow
            className={`${styles["reverse"]} ${
              !allowForward ? styles.disable : ""
            }`}
            onClick={() => {
              if (allowForward) onPagination?.(--page);
            }}
          />

          <RightArrow
            className={!hideForward.allow ? styles.disable : ""}
            onClick={() => {
              if (hideForward.allow) onPagination?.(++page);
            }}
          />
          <FastForward
            className={!hideForward.allow ? styles.disable : ""}
            onClick={() => {
              if (hideForward.allow) {
                onPagination?.(hideForward.totalPage);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
