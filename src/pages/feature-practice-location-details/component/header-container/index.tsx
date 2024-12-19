import {
  Corporate,
  Download,
  Hubspot,
  LinkedIn,
  Salesforce,
  Save,
} from "libs/shared/assets/svg";
import styles from "./header-container.module.scss";
import { FemaleIcon, MaleIcon } from "libs/shared/assets/svg";
import { PracticeLocationData } from "pages/feature-practice-location-details";

export const HeaderContainer = ({ data }: { data: PracticeLocationData | null }) => {
  return (
    <div className={styles.container}>
      <section>
        <Corporate />
        <p>{data?.overview[0]?.practice_name} </p>
        
      </section>
      <div className={styles.name_footer}>
        <section>
          <span>{data?.overview[0].practice_web_address && <a href={data?.overview[0].practice_web_address} target="_blank">{data?.overview[0].practice_web_address}</a>}</span>
          
        </section>
        <span>{data?.overview[0].practice_phone_number}</span>
        <section className={styles.icon_container}>
          <Save />
          <Download />
          <Salesforce />
          <Hubspot />
        </section>
      </div>
    </div>
  );
};
