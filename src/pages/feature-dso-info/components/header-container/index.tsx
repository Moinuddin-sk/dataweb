import {
  Download,
  Hubspot,
  LinkedIn,
  Salesforce,
  Save,
} from "libs/shared/assets/svg";
import styles from "./header-container.module.scss";
import { DentistData } from "pages/feature-dso-info";
import { FemaleIcon, MaleIcon } from "libs/shared/assets/svg";

export const HeaderContainer = ({ data }: { data: DentistData | null }) => {
  return (
    <div className={styles.container}>
      <section>
        {data?.data?.overview?.gender && (
          <span className={styles.name_card}>
            {data?.data.overview.gender === "M" ? <MaleIcon /> : <FemaleIcon />}
          </span>
        )}
        <p>{data?.data?.overview?.contact_full_name} </p>
        {data?.data?.overview?.contact_linkedin_url && <a href={data?.data?.overview?.contact_linkedin_url} target="_blank"><LinkedIn /></a>}
      </section>
      <div className={styles.name_footer}>
        <section>
          <span>{data?.data?.overview?.title}</span>{" "}
          {data?.data?.parentCompanyInfo?.hq_location}
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
