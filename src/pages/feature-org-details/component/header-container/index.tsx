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
import { OrgData } from "pages/feature-org-details";

export const HeaderContainer = ({ data }: { data: OrgData | null }) => {
  return (
    <div className={styles.container}>
      <section>
        <Corporate />
        <p>{data?.overview[0].parent_company_name} </p>
        {data?.overview[0].parent_company_linkedin_url && <a href={data?.overview[0].parent_company_linkedin_url} target="_blank"><LinkedIn /></a>}
      </section>
      <div className={styles.name_footer}>
        <section>
          <span>{data?.overview[0].hq_location}</span>
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
