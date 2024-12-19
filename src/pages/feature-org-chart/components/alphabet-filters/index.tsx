import { useMemo } from "react";
import styles from "./alphabet-filters.module.scss";

export const AlphabetFilters = ({
  value = "All",
  onSelect,
}: {
  value?: string;
  onSelect?: (value: string) => void;
}) => {
  const filters = useMemo(() => {
    const start = 65;
    const end = 90;
    const arr = ["All"];
    for (let i = start; i <= end; i++) {
      arr.push(String.fromCharCode(i));
    }
    return arr;
  }, []);
  return (
    <ul className={styles.container}>
      {filters.map((el) => {
        return (
          <li
            className={value === el ? styles.active : ""}
            key={el}
            onClick={() => {
              onSelect?.(el);
            }}>
            {el}
          </li>
        );
      })}
    </ul>
  );
};
