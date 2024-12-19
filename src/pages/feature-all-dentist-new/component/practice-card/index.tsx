import { Corporate } from "libs/shared/assets/svg";
import { PracticeLocation } from "pages/feature-org-details";
import styles from "./practice-card.module.scss";

export const PracticeCard = ({ data }: { data: PracticeLocation }) => {
  return (
    <section className={styles.practice_parent_container}>
      <Corporate />
      <div>
        <p>{data.practice_name}</p>
        <span>{data.practice_address1}</span>
        {/* <span>{data.practice_state}</span> */}
      </div>
    </section>
  );
};
