import styles from "./insights.module.scss";
import { useMemo, useState } from "react";
import { DentistData } from "pages/feature-dental-labs-new";
import { Corporate } from "libs/shared/assets/svg";
import { ApiPractice } from "../api-practice";
import { PracticeCard } from "../practice-card";
import { ContactCard } from "pages/feature-org-details/contact-card";

export const Insights = ({
  data,
  profile_id
}: {
    data: DentistData | null;
    profile_id: string
}) => {
  // console.log(data?.overview[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const overView = useMemo(() => {
    return data?.overview || [];
  }, [data]);
  // const subsidiaries = useMemo(() => {
  //   return data?.subsidiaries || [];
  // }, [data]);
  const labInfo = useMemo(() => {
    return data?.labInfo || [];
  }, [data]);
  const tabs: { label: string; value: string }[] = [
    { label: "Overview", value: "overview" },
    { label: "Company info", value: "company_info" },
  ]
  // unique dso 
  // Parent_Company
  // Parent_Company_LinkedIn_URL
  // Parent_Web_Address
  // Parent_Phone_Number
  // Parent_FAX_Number
  // Parent_Address1
  // Parent_Address2
  // Parent_City
  // Parent_State
  // Parent_County
  // Parent_ZipCode
  // Parent_Country
  // Parent_Year_Founded
  // Parent_Employees
  // Parent_Revenue_Actual
  // Parent_Revenue_Range
  return (
    <div className={styles.container}>
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
               (
                <div>
            <p>Name: {overView.contact_full_name}</p>
            <p>Email: {overView.email_address}</p>
            <p>Title: {overView.title}</p>
            <p>Level: {overView.title_level}</p>
            <p>Linkedin: {overView.contact_linkedin_url}</p>
            <p>First Name: {overView.contact_first_name}</p>
            <p>Last Name: {overView.contact_last_name}</p>
            <p>Direct dial: {overView.direct_dial}</p>
              </div>
              )
            }
        {activeTab === "company_info" &&
          (<div>
         
          <p>Company Name: {labInfo.company_name_lab}</p>
          {/* <p>Linkedin: {labInfo.company_linkedin_url_lab}</p> */}
          <p>Website: {labInfo.web_address_lab}</p>
          <p>Address: {labInfo.address1_lab}</p>
          
          <p>City: {labInfo.city_lab}</p>
          <p>State: {labInfo.state_lab}</p>
          <p>Country: {labInfo.country_lab}</p>
          <p>Zipcode: {labInfo.zipcode_lab}</p>
          <p>Phone: {labInfo.phone_number_lab}</p>
          <p>Employees: {labInfo.employees_lab}</p>
          <p>Revenue: {labInfo.revenue_lab}</p>
          </div>)
         }
        
      </div>
    </div>
  );
};
