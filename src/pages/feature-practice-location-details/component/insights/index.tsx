import styles from "./insights.module.scss";
import { useMemo, useState } from "react";
import { PracticeLocationData } from "pages/feature-practice-location-details";
import { ApiPractice } from "../api-practice";
import { ContactCard } from "../contact-card";
export const Insights = ({ data, practice_location_id }: { data: PracticeLocationData | null, practice_location_id: string }) => {
  // console.log(data?.overview[0]);
  const [activeTab, setActiveTab] = useState("contacts");
  const overView = useMemo(() => {
    return data?.overview || []
  }, [data]);
  const contacts = useMemo(() => {
    return data?.contacts || [];
  }, [data]);

  // const overView = useMemo(() => {
  //   return Object.entries(data || {})
  //     .map(([key, value]) => {
  //       return { label: key.replace(/_/g, " "), value };
  //     })
  //     .filter((el) => !!el.value);
  // }, [data, activeTab]);

  const tabs: { label: string; value: string }[] = [
    // { label: "Overview", value: "overview" },
    // { label: "Parent Info", value: "parent_info" },
    // { label: "Practice locations", value: "practice_locations" },
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
          overView?.map((el) => {
            return (
              <div>
                <p>{el.parent_company_overview}</p>
                {/* <p>
                  <strong>{`Company name`} : </strong> {el.parent_company_name}
                </p>
                <p>
                  <strong>{`Email`} : </strong> {el.email_address}
                </p>
                <p>
                  <strong>{`Direct dial`} : </strong> {el.direct_dial}
                </p>
                <p>
                  <strong>{`Website `} : </strong> {el.parent_web_address}
                </p>
               
                <p>
                  <strong>{`Year founded`} : </strong> {el.parent_year_founded}
                </p>
                <p>
                  <strong>{`Employees`} : </strong> {el.parent_employees}
                </p>
                <p>
                  <strong>{`Revenue actual`} : </strong> {el.parent_revenue_actual}
                </p>
                <p>
                  <strong>{`Headquater`} : </strong> {el.hq_location}
                </p>
                <p>
                  <strong>{`Country`} : </strong> {el.parent_country}
                </p> */}
                
              </div>
            );
          })}
       
        {activeTab === "contacts" &&
          < ApiPractice
            practice_location_id={practice_location_id}
          endpoint={"get-practice-contacts"}
            Component={ContactCard}
          />
        }
      </div>
    </div>
  );
};
