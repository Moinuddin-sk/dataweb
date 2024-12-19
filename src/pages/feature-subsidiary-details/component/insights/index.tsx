import styles from "./insights.module.scss";
import { useMemo, useState } from "react";
import { SubsidiaryData } from "pages/feature-subsidiary-details";
import { Corporate, LinkedIn } from "libs/shared/assets/svg";
import {
  NameAndSpeciality
} from "pages/feature-dso-corporate/components/table-row-component";

export const Insights = ({ data }: { data: SubsidiaryData | null }) => {
  // console.log(data?.overview[0]);
  const [activeTab, setActiveTab] = useState("parent_info");
  const overView = useMemo(() => {
    return data?.overview || []
  }, [data]);
  const parentInfo = useMemo(() => {
    return data?.parent_info || [];
  }, [data]);

  const practiceLocations = useMemo(() => {
    return data?.practice_locations || [];
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
    { label: "Parent Info", value: "parent_info" },
    { label: "Practice locations", value: "practice_locations" },
    // { label: "Contacts", value: "contacts" },
  ];
  return (
    <div className={styles.container}>
      <h5>Insights</h5>
      <ul className={styles.tab}>
        <li
          className={"parent_info" === activeTab ? styles.active : ""}
          key={"parent_info"}
          onClick={() => {
            setActiveTab("parent_info");
          }}>
          {`Parent Info`}
          <span />
        </li>
        <li
          className={"practice_locations" === activeTab ? styles.active : ""}
          key={"practice_locations"}
          onClick={() => {
            setActiveTab("practice_locations");
          }}>
          {`Practice locations (${practiceLocations.length})`}
          <span />
        </li>
        {/* {tabs?.map((el) => {
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
        })} */}

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
        {activeTab === "parent_info" &&
          parentInfo?.map((el:any) => {
            console.log(el);
            return (
              <div className={styles.subsidary_main_container}>
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
        {activeTab === "practice_locations" &&
          practiceLocations?.map((el) => {
            return (
              <section className={styles.practice_parent_container}>
                <Corporate />
                <div>
                  <p>
                    {el.practice_name}
                  </p>
                  <span>{el.practice_address1}</span>
                  <span>{el.practice_state}</span>
                </div>
              </section>
            );
          })}
        {activeTab === "contacts" &&
          contacts?.map((el) => {
            return (
              <section className={styles.practice_parent_container}>
                <NameAndSpeciality
                  name={el.contact_full_name}
                  position={el.title}
                  linkedin={el?.contact_linkedin_url}
                  flow={false}
                  id={el.contact_id}
                />
              </section>
            );
          })}
        {/* {overView?.map((el) => {
          return (
            <div>
              <p>
                <strong>{el.label} : </strong> {el.value}
              </p>
            </div>
          );
        })}
        {overView.length === 0 && <div>No Records Found</div>} */}
      </div>
    </div>
  );
};
