import { DentistData, DentistDataProps } from "pages/feature-dso-info";
import styles from "./insights.module.scss";
import { useMemo, useState } from "react";

export const Insights = ({ data, dataType }: { data: DentistData | null, dataType?: string }) => {
  const [activeTab, setActiveTab] =
    useState<keyof DentistDataProps>("overview");
  const overView = useMemo(() => {
    return Object.entries(data?.data?.[activeTab] || {})
      .map(([key, value]) => {
        return { label: key.replace(/_/g, " "), value };
      })
      // .filter((el) => !!el.value);

  }, [data, activeTab]);

  const tabs: { label: string; value: keyof DentistDataProps }[] = dataType == 'dental' ? [
    { label: "Overview", value: "overview" },
    { label: "Company Info", value: "labInfo" },
  ] : [
    { label: "Overview", value: "overview" },
    { label: "Practice Info", value: "practiceInfo" },
    // { label: "DSO Info", value: "dsoInfo" },
    { label: "Parent Company", value: "parentCompanyInfo" },
    { label: "Intent", value: "intent" },
    { label: "Location Info", value: "locationInfo" },
    { label: "Procedure Code", value: "procedureCode" },
    { label: "State License Code", value: "stateLicenceCode" },
  ];
  return (
    <div className={styles.container}>
      {/* <h5>Insights</h5> */}
      <ul className={styles.tab}>
        {tabs?.map((el) => {
          return (
            <> 
              {dataType != 'dso_corporate' || (dataType == 'dso_corporate' && (el.value != "procedureCode" && el.value != "stateLicenceCode" && el.value != "practiceInfo"))?         
            <li
              className={el.value === activeTab ? styles.active : ""}
              key={el.value}
              onClick={() => {
                setActiveTab(el.value);
              }}>
              {el.label}
              <span />
            </li>
            :<></>}
            </>

          );
        })}
      </ul>
      <div className={styles.list}>
        {overView?.map((el) => {
          return (
            el.label == "practice latitude" ? <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36553983.44087083!2d-96!3d56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1732648908279!5m2!1sen!2sin" width="600" height="450"  loading="lazy" ></iframe> :
            <div>
              <p>
                <strong>{el.label} : </strong> {el.value}
              </p>
            </div>
          );
        })}
        {overView.length === 0 && <div>No Records Found</div>}
      </div>
    </div>
  );
};
