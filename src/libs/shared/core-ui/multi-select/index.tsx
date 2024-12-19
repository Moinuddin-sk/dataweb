import { useEffect, useRef, useState } from "react";
import styles from "./multi-select.module.scss";
import { CloseIcon, Dropdown } from "libs/shared/assets/svg";


export interface Option {
  label: string;
  value: any;
}
export interface MultiSelectProps {
  value?: string[];
  placeholder?: string;
  onSelect?: (value: string[]) => void;
  options: (string| Option)[];
  fullWidth?: boolean;
}

export const MultiSelect = ({
  value = [],
  placeholder,
  onSelect,
  options=[],
  fullWidth,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = ((val:any) => {
    if (typeof val === "string") return val;
      if (options.some((opt) => typeof opt === "object")) {
        const matchedOption = options.find(
          (opt) => typeof opt === "object" && opt.value === val
        ) as Option;
        return matchedOption?.label;
      }
      return null;
    });


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

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        open || value?.length !== 0 ? styles.active : ""
      } ${fullWidth ? styles.fullWidth : ""}`}>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}>
        <section>{placeholder}</section>

        <Dropdown />
      </div>
      {open && (
        <ul className={styles.dropdown_container}>
          <li className={styles.chip_container}>
            {value?.map?.((val) => {
              return (
                <span className={styles.chip} key={val}>
                  {selectedLabel(val)}
                  <CloseIcon
                    onClick={() => {
                      onSelect?.(value.filter((el) => el !== val));
                    }}
                  />
                </span>
              );
            })}
          </li>
          {value.length !== 0 && (
            <li className={styles.btn_container}>
              <span
                className={styles.clear_btn}
                onClick={() => {
                  onSelect?.([]);
                }}>
                Clear All
              </span>
            </li>
          )}
          <ul>
            {options?.map?.((option) => {
              const isSelected =
                typeof option === "string"
                  ? option === value
                  : option.value === value;

              const displayLabel =
                typeof option === "string" ? option : option.label;

              const selectValue =
                typeof option === "string" ? option : option.value;
              return (
                <li
                  className={value.includes(selectValue) ? styles.active_option : ""}
                  key={selectValue}
                  onClick={() => {
                    const alreadyExist = value?.findIndex?.(
                      (el) => el === option
                    );
                    console.log(alreadyExist);
                    if (alreadyExist === -1) {
                      onSelect?.([...value, selectValue]);
                    } else {
                      onSelect?.(value.filter((el) => el !== option));
                    }
                  }}>
                  {displayLabel}
                </li>
              );
            })}
          </ul>
        </ul>
      )}
    </div>
  );
};
