import {
  Corporate,
  Download,
  Hubspot,
  LinkedIn,
  Salesforce,
  Save,
  LinkedInBlack,
  LinkBlack,
  FacebookBlack,
  XBlack,
} from "libs/shared/assets/svg";
import styles from "./header-container.module.scss";
import { FemaleIcon, MaleIcon } from "libs/shared/assets/svg";
import { DentistData } from "pages/feature-dental-labs-new";

export const HeaderContainer = ({ data }: { data: DentistData | null }) => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          {data?.overview?.gender =="F" ? <FemaleIcon/> :<MaleIcon />}
        </div>
        <div className={styles.content}>
          <section>
            <div>
              <p className={styles.name}>{data?.overview.contact_full_name} </p>
              <div className={styles.iconContainer}>
                <div className={styles.icon}>
                  {data?.overview.contact_linkedin_url && <a href={data?.overview.contact_linkedin_url} target="_blank"><LinkedInBlack/></a>}
                </div>
                {/* <div className={styles.icon}>
                  {data?.overview.parent_company_linkedin_url && <a href={data?.overview.parent_company_linkedin_url} target="_blank"><LinkedInBlack /></a>}
                </div> */}
                {/* <div className={styles.icon}>
                  {data?.overview.parent_company_linkedin_url && <a href={data?.overview.parent_company_linkedin_url} target="_blank"><FacebookBlack /></a>}
                </div>
                <div className={styles.icon}>
                  {data?.overview.parent_company_linkedin_url && <a href={data?.overview.parent_company_linkedin_url} target="_blank"><XBlack /></a>}
                </div> */}
              </div>
            </div>
            <section className={styles.companyContent}>
              {data?.overview.title && <span>{data?.overview.title}</span>}
              {data?.overview.email_address  && <span>{data?.overview.email_address}</span>}
              {data?.overview.title_level && <span>{data?.overview.title_level}</span>}
            </section>
          </section>
         
          <div className={styles.name_footer}>
            
            <section className={styles.icon_container}>
              <Save />
              <Download />
              <Salesforce />
              <Hubspot />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
