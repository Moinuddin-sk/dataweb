import { DentistData } from "pages/feature-dso-info";
import styles from "./dental-group.module.scss";
export const DentalGroup = ({ data }: { data: DentistData | null }) => {
  return (
    <div className={styles.container}>
      <h5>{data?.data?.practiceInfo?.practice_name}</h5>
      <ul className={styles.list_container}>
        <li>{data?.data?.practiceInfo?.practice_ownership_type}</li>
        {
          <li>
            {data?.data?.practiceInfo?.practice_employees || "N/A"} employees
          </li>
        }
        <li>
          {data?.data?.practiceInfo?.practice_address1}
          {data?.data?.practiceInfo?.practice_address2
            ? `,${data?.data?.practiceInfo?.practice_address1}`
            : ""}{" "}
          ,{data?.data?.practiceInfo?.practice_city}
        </li>
      </ul>
      <p>
        {/* DECA Dental Group is a Dallas-based, clinician founded and clinician
        led, dental service organization that has been delivering high-quality
        dental care to patients since 2008. DECA is actively expanding its
        footprint coast-to-coast under the brand Ideal Dental. DECA's culture is
        founded on a patient-centric model. The company is guided by its vision
        to be the premier provider of all dental services under one roof while
        being the first choice for dentists and staff seeking a partner for
        growth, innovation, and learning. To learn more, please visit
        decadental.com and myidealdental.com. Show Less */}
      </p>
      <ul className={styles.list_footer}>
        <li>
          <p>Founding year</p>
          <p>{data?.data?.practiceInfo?.practice_year_founded || "N/A"}</p>
        </li>
        <li>
          <p>Account location</p>
          <p>
            {data?.data?.practiceInfo?.practice_address1}
            {data?.data?.practiceInfo?.practice_address2
              ? `,${data?.data?.practiceInfo?.practice_address1}`
              : ""}{" "}
            ,{data?.data?.practiceInfo?.practice_city}
          </p>
        </li>
        <li>
          <p>Annual revenue</p>
          <p>{data?.data?.practiceInfo?.practice_revenue_actual || "N/A"}</p>
        </li>
        <li>
          <p>Company phone</p>
          <p>{data?.data?.practiceInfo?.practice_phone_number || "N/A"}</p>
        </li>
      </ul>
    </div>
  );
};
