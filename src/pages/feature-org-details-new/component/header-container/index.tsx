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
import { OrgData } from "pages/feature-org-details";

export const HeaderContainer = ({ data }: { data: OrgData | null }) => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          {data?.overview[0]?.parent_web_address?.length > 5 ? (
            <img src={`https://logo.clearbit.com/${data?.overview[0]?.parent_web_address}?size=20`}></img>
          ) : <Corporate />}
        </div>
        <div className={styles.content}>
          <section>
            <div>
              <p className={styles.name}>{data?.overview[0].parent_company_name} </p>
              <div className={styles.iconContainer}>
                <div className={styles.icon}>
                  {data?.overview[0].parent_web_address && <a href={data?.overview[0].parent_web_address} target="_blank"><LinkBlack size={24}/></a>}
                </div>
                <div className={styles.icon}>
                  {data?.overview[0].parent_company_linkedin_url && <a href={data?.overview[0].parent_company_linkedin_url} target="_blank"><LinkedInBlack /></a>}
                </div>
                {/* <div className={styles.icon}>
                  {data?.overview[0].parent_company_linkedin_url && <a href={data?.overview[0].parent_company_linkedin_url} target="_blank"><FacebookBlack /></a>}
                </div>
                <div className={styles.icon}>
                  {data?.overview[0].parent_company_linkedin_url && <a href={data?.overview[0].parent_company_linkedin_url} target="_blank"><XBlack /></a>}
                </div> */}
              </div>
            </div>
            <section className={styles.companyContent}>
              {data?.overview[0].technology && <span>{data?.overview[0].technology}</span>}
              <span>{data?.overview[0].parent_address1}</span>
              {data?.overview[0].parent_employees && <span>{data?.overview[0].parent_employees} employees</span>}
              <span>{data?.overview[0].parent_revenue_range}</span>
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
