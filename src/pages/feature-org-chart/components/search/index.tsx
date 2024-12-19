import { Search } from "libs/shared/assets/svg";
import styles from "./search.module.scss";

export const SearchOrg = ({
  onValueChange,
  onSearch
}) => {
  return (
    <div className={styles.container}>
      <input onChange={(e) => {
        onValueChange(e.target.value);
      }} 
      />
      <span>
        <Search onClick={() => {
          onSearch;
        }} />
      </span>
    </div>
  );
};
