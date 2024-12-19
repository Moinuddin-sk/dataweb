/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Download, Hubspot, Salesforce, Save } from "libs/shared/assets/svg";
import { Pagination } from "./components/pagination/pagination";
import { TableList } from "./components/tableList";
import { TableProps } from "./models/table.model";
import { MultiSelect, AutoComplete } from "libs/shared/core-ui";
import styles from "./table.module.scss";
import { Intent } from "constants/drop-down-options";
import { Spin } from "antd";

export const Table = <T extends {}, K extends keyof T>({
  headers = [],
  data = [],
  pagination,
  selected,
  onSelect,
  title,
  intentValue = [],
  onIntentSelect,
  loading=true,
  ...props
}: TableProps<T, K>) => {
  return (
    <div className={styles.main_container}>
      <div
        className={
          onIntentSelect
            ? `${styles.table_tools_conatiner}`
            : `${styles.table_tools_conatiner_xp}`
        }>
        {pagination && (
          <div className={styles.record}>Record: {pagination?.total || 0}</div>
        )}
        {title && <span>{title}</span>}
        {onIntentSelect && (
          <div className={styles.intent_container}>
            <div className={styles.intent_input}>
              <div className={styles.intent_search}>
                <AutoComplete
                  placeholder="Intent Search"
                  value={intentValue}
                  api={`${import.meta.env.VITE_BASE_HOST}/master/get-intent-suggestion`}
                  onSelect={(data) => {
                    onIntentSelect?.([data]);
                  }}
                  
                  />

{/* 
                <MultiSelect
                  options={Intent}
                  placeholder="Intent Search"
                  value={intentValue}
                  onSelect={(data) => {
                    onIntentSelect?.(data);
                  }}
                  fullWidth
                /> */}
              </div>
            </div>
          </div>
        )}
        {onSelect && (
          <div
            className={`${styles.tools}  ${
              selected?.length !== 0 ? styles.active : ""
            }`}>
            <Save />
            <Download />
            <Salesforce />
            <Hubspot />
          </div>
        )}
      </div>
      <TableList
        headers={headers}
        data={data}
        {...props}
        selected={selected}
        onSelect={onSelect}
        loading={loading}
      />
      {data.length === 0 && !loading && (
        <div className={styles.no_data_container}>
          <section>
            <svg
              width="64"
              height="41"
              viewBox="0 0 64 41"
              xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                <ellipse fill="var(--grey)" cx="32" cy="33" rx="32" ry="7" />
                <g fillRule="nonzero" stroke="#3e3e3e">
                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                  <path
                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                    fill="var(--grey)"></path>
                </g>
              </g>
            </svg>
            <p>No Data available </p>
          </section>
        </div>
      )}

      {pagination && <Pagination {...pagination} />}
    </div>
  );
};
