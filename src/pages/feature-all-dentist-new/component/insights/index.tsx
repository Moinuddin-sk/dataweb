import styles from "./insights.module.scss";
import { useMemo, useState } from "react";
import { DentistData } from "pages/feature-dental-labs-new";
import { Corporate } from "libs/shared/assets/svg";
import { ApiPractice } from "../api-practice";
import { PracticeCard } from "../practice-card";
import { ContactCard } from "pages/feature-org-details/contact-card";

export const Insights = ({
  data,
  data_type
}: {
    data: DentistData | null;
    data_type?: string
}) => {
  // console.log(data?.overview[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const overView = useMemo(() => {
    return data?.overview || [];
  }, [data]);
  // const subsidiaries = useMemo(() => {
  //   return data?.subsidiaries || [];
  // }, [data]);
  const practiceInfo = useMemo(() => {
    return data?.practiceInfo || [];
  }, [data]);
  const stateLicenceCode = useMemo(() => {
    return data?.stateLicenceCode || [];
  }, [data]);
  const procedureCode = useMemo(() => {
    return data?.procedureCode || [];
  }, [data]);
  const intent = useMemo(() => {
    return data?.intent || [];
  }, [data]);
  const tabs: { label: string; value: string }[] = data_type == "2location" ? [
    { label: "Overview", value: "overview" },
    { label: "Practice info", value: "company_info" },
    { label: "State license", value: "state_license" },
  ] :[
    { label: "Overview", value: "overview" },
    { label: "Practice info", value: "company_info" },
    { label: "State license", value: "state_license" },
    { label: "Procedure code", value: "procedure_code" },
    { label: "Intent", value: "intent" },
  ]
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
                  <p>Gender: {overView.gender}</p>
                  <p>Title: {overView.title}</p>
                  <p>Level: {overView.title_level}</p>
                  <p>Department: {overView.department}</p>
                  <p>Email: {overView.email_address}</p>
                  <p>Linkedin: {overView.contact_linkedin_url}</p>
                  <p>First Name: {overView.contact_first_name}</p>
                  <p>Last Name: {overView.contact_last_name}</p>
                  <p>Direct dial: {overView.direct_dial}</p>
                  {data_type != "2location" && <p>Last updated date: {overView.last_updated_date}</p>}
                  <p>NPI number: {overView?.npi_number}</p>
                  <p>Experience of dentist: {overView?.experience_of_dentist}</p>
                  <p>Dentist type: {overView?.dentist_type}</p>
                  <p>Dental degree: {overView?.dental_degree}</p>
            {data_type != "2location" && <p>Dentist procedure score: {overView?.dentist_procedure_score}</p>}
              
            
              </div>
              )
        }
        {activeTab === "company_info" &&
          (<div>
          <p>Name: {practiceInfo.practice_name}</p>
          <p>Website: {practiceInfo.practice_web_address}</p>
          <p>Address: {practiceInfo?.practice_address1}</p>
          <p>Address 2: {practiceInfo?.practice_address2}</p>
          <p>City: {practiceInfo?.practice_city}</p>
          <p>State: {practiceInfo?.practice_state}</p>
          <p>County: {practiceInfo?.practice_county}</p>
          <p>Country: {practiceInfo?.practice_country}</p>
          <p>Zipcode: {practiceInfo?.practice_zipcode}</p>
          <p>Phone: {practiceInfo?.practice_phone_number}</p>
          <p>Fax: {practiceInfo?.practice_fax_number}</p>
          <p>Employees: {practiceInfo?.practice_employees}</p>
          <p>Revenue actual: {practiceInfo?.practice_revenue_actual}</p>
          <p>Revenue range: {practiceInfo?.practice_revenue_range}</p>
          <p>Nimber of doctors: {practiceInfo?.practice_number_of_doctors}</p>
          <p>Year founded: {practiceInfo?.practice_year_founded}</p>
          <p>Ownership: {practiceInfo?.practice_ownership_type}</p>
          <p>Location range: {practiceInfo?.practices_locations_range}</p>
          <p>Location number: {practiceInfo?.practices_locations_number}</p>
          </div>)
         }
        
      {activeTab === "state_license" &&
        (<div>
        <p>State license code1: {stateLicenceCode.state_license_code1}</p>
        <p>State license code2: {stateLicenceCode.state_license_code2}</p>
        <p>State license code3: {stateLicenceCode.state_license_code3}</p>
        <p>State license code4: {stateLicenceCode.state_license_code4}</p>
        <p>State license code5: {stateLicenceCode.state_license_code5}</p>
        <p>State license number1: {stateLicenceCode.state_license_number1}</p>
        <p>State license number2: {stateLicenceCode.state_license_number2}</p>
        <p>State license number3: {stateLicenceCode.state_license_number3}</p>
        <p>State license number4: {stateLicenceCode.state_license_number4}</p>
        <p>State license number5: {stateLicenceCode.state_license_number5}</p>
        </div>)
      }
        {activeTab === "procedure_code" && data_type != "2location" &&
        (<div>
          <p>{procedureCode.procedure_code}</p>
        </div>)
      }
        {activeTab === "intent" && data_type != "2location" &&
          (<div>
          <p>{intent.intent_keyword}</p>
          </div>)
        }
    </div>
    </div>
  );
};
