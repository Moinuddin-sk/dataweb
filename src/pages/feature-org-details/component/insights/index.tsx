import styles from "./insights.module.scss";
import { useMemo, useState } from "react";
import { OrgData } from "pages/feature-org-details";
import { Corporate } from "libs/shared/assets/svg";
import { ApiPractice } from "../api-practice";
import { PracticeCard } from "../practice-card";
import { ContactCard } from "pages/feature-org-details/contact-card";

export const Insights = ({
  data,
  parent_dso_id,
  dso_type,
}: {
  data: OrgData | null;
  parent_dso_id: string;
  dso_type?: string;
}) => {
  // console.log(data?.overview[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const overView = useMemo(() => {
    return data?.overview || [];
  }, [data]);
  const subsidiaries = useMemo(() => {
    return data?.subsidiaries || [];
  }, [data]);

  const tabs: { label: string; value: string }[] = dso_type == "dso" ?[
    { label: "Overview", value: "overview" },
    { label: "Contacts", value: "contacts" },
  ]:[
      { label: "Overview", value: "overview" },
      { label: "Subsidiaries", value: "subsidiaries" },
      { label: "Practice locations", value: "practice_locations" },
      { label: "Contacts", value: "contacts" },
  ];

  return (
    <div className={styles.container}>
      <h5>Insights</h5>
      <ul className={styles.tab}>
        {tabs?.map((el) => {
          return (
            <li
              className={el.value === activeTab ? styles.active : ""}
              key={el.value}
              onClick={() => {
                setActiveTab(el.value);
              }}>
              {el.label}
              <span />
            </li>
          );
        })}
      </ul>
      <div className={styles.list}>
        {activeTab === "overview" &&
          overView?.map?.((el) => {
            return (
              <div>
                <p>Name: {el.parent_company_name}</p>
                <p>Overview: {el.parent_company_overview}</p>
                <p>Address: {el.parent_address1}</p>
                <p>Website: {el.parent_web_address}</p>
                <p>Linkedin: {el.parent_company_linkedin_url}</p>
                <p>Phone: {el.parent_phone_number}</p>
                <p>Fax: {el.parent_fax_number}</p>
                <p>Year founded: {el.parent_year_founded}</p>
                <p>Revenue actual: {el.parent_revenue_actual}</p>
                <p>Revenue range: {el.parent_revenue_range}</p>
                <p>Headquater: {el.hq_location}</p>
                <p>Employees: {el.parent_employees}</p>
              </div>
            );
          })}
        {activeTab === "subsidiaries" &&
          subsidiaries?.map((subsidiary) => {
            console.log(subsidiary);
            return (
              <div className={styles.subsidary_main_container}>
                <div className={styles.subsidary_container}>
                  <Corporate />
                  <div>
                    <p>{subsidiary.subsidiary_name}</p>
                    <span>
                      {subsidiary.subsidiary_web_address && (
                        <a
                          href={subsidiary.subsidiary_web_address}
                          target="_blank">
                          {subsidiary.subsidiary_web_address}
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        {activeTab === "practice_locations" && (
          <ApiPractice
            parent_dso_id={parent_dso_id}
            endpoint={"get-parent-practice-locations"}
            Component={PracticeCard}
          />
        )}
        {activeTab === "contacts" && (
          <ApiPractice
            parent_dso_id={parent_dso_id}
            endpoint={"get-parent-contacts"}
            Component={ContactCard}
          />
        )}
      </div>
    </div>
  );
};
