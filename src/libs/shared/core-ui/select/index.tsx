/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import styles from "./select.module.scss";
import { Dropdown } from "libs/shared/assets/svg";

export interface Option {
  label: string;
  value: any;
}

export interface SelectProps {
  options: (string | Option)[];
  value?: null | any;
  placeholder?: string;
  onSelect?: (value: any) => void;
}

export const Select = ({
  options = [],
  value = null,
  placeholder,
  onSelect,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Get the label of the selected option
  const selectedLabel = (() => {
    if (typeof value === "string") return value;
    if (options.some((opt) => typeof opt === "object")) {
      const matchedOption = options.find(
        (opt) => typeof opt === "object" && opt.value === value
      ) as Option;
      return matchedOption?.label;
    }
    return null;
  })();

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
      className={`${styles.container} ${open || value ? styles.active : ""}`}>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}>
        <section>{selectedLabel || placeholder}</section>
        <Dropdown />
      </div>
      {open && (
        <ul className={styles.dropdown_container}>
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
                className={isSelected ? styles.active_option : ""}
                key={typeof option === "string" ? option : option.value}
                onClick={() => {
                  onSelect?.(selectValue);
                  setOpen(false);
                }}>
                {displayLabel}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
