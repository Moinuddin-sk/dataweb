/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./auto-complete.module.scss";
import { Dropdown } from "libs/shared/assets/svg";

export interface AutoCompleteProps {
  value?: null | any;
  placeholder?: string;
  loading?: boolean;
  handleSearch?: (
    searchText: string
  ) => string[] | DefaultOptionType[] | undefined;
  style?: React.CSSProperties;
  api?: string;
  dataHandler?: (data: any) => DefaultOptionType[] | undefined;
  onSelect?: (value: string) => void;
  initialCall?: boolean;
}

export const AutoComplete = ({
  value = null,
  placeholder,
  handleSearch,
  api,
  onSelect,
  initialCall,
}: AutoCompleteProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [originalOptions, setOriginalOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<any>(value);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const onSearch = async (searchText: string) => {
    setLoading(true);
    try {
      if (searchText || initialCall) {
        if (initialCall && originalOptions.length > 0) {
          const filteredOptions = originalOptions.filter((option) =>
            (option as string)?.toLowerCase().includes(searchText.toLowerCase())
          );
          setOptions(filteredOptions);
        } else if (api) {
          const response = await axios.get(api, {
            params: { key: searchText },
          });
          setOptions(response?.data?.data?.suggestions || []);
          setOriginalOptions(response?.data?.data?.suggestions || []);
        } else if (handleSearch) {
          const data: string[] = handleSearch?.(searchText) as string[];
          setOptions(data || []);
          setOriginalOptions(data || []);
        }
      } else {
        setOptions([]);
        onSelect?.("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (initialCall) {
      onSearch("");
    }
  }, [initialCall]);

  // const handleChange = (value: string) => {
  //   setInputValue(value); // Update the input value state as the user types
  // };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${open || (Array.isArray(value) ? value.length>0: value)? styles.active : ""}`}>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}>
        <section>{(Array.isArray(value)? value[0]:value) || placeholder}</section>

        <Dropdown />
      </div>
      {/* <AntAutoComplete
        style={{ minWidth: "120px", ...style }}
        value={inputValue} // Use the controlled inputValue state here
        options={options}
        placeholder={placeholder}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={handleChange}
        popupMatchSelectWidth={false}
        notFoundContent={
          loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
              }}>
              <Spin />
            </div>
          ) : null
        }></AntAutoComplete> */}
      {open && (
        <ul className={styles.dropdown_container}>
          <li>
            <input
              onChange={(e) => {
                onSearch(e.target.value);
              }}
              className={styles.search_input}
              placeholder="Type to get Suggestion"
            />
            {loading && (
              <div className={styles.spinner}>
                <Spin size="small" />
              </div>
            )}
          </li>
          <ul>
            {options.map((option) => {
              return (
                <li
                  className={option === value ? styles.active_option : ""}
                  key={option}
                  onClick={() => {
                    onSelect?.(option);
                    setOpen(false);
                  }}>
                  {option}
                </li>
              );
            })}
          </ul>
        </ul>
      )}
    </div>
  );
};
