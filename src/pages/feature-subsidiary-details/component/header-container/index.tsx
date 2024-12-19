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
import { SubsidiaryData } from "pages/feature-subsidiary-details";

export const HeaderContainer = ({ data }: { data: SubsidiaryData | null }) => {
  return (
    <div className={styles.container}>
      <section>
        <Corporate />
        <p>{data?.overview[0]?.subsidiary_name} </p>
        
      </section>
      <div className={styles.name_footer}>
        <section>
          <span>{data?.overview[0].subsidiary_web_address && <a href={data?.overview[0].subsidiary_web_address} target="_blank">{data?.overview[0].subsidiary_web_address}</a>}</span>
          <span>{data?.overview[0].subsidiary_main_email_address}</span>
        </section>
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
