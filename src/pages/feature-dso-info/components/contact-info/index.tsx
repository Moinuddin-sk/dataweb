import { DentistData } from "pages/feature-dso-info";
import styles from "./contact-info.module.scss";

export const ContactInfo = ({ data }: { data: DentistData | null }) => {
  return (
    <div className={styles.container}>
      <h5>Contact information</h5>
      {data?.data?.overview?.email_address && (
        <section>
          <p>{data?.data?.overview?.email_address}</p>
          {/* <button>Access email</button> */}
        </section>
      )}
      {data?.data?.overview?.direct_dial && (
        <section>
          <p>{data?.data?.overview?.direct_dial}</p>
          <button>Access mobile</button>
        </section>
      )}
      {/* <p>+39 02 8904 1616</p>
      <p>Business</p> */}
    </div>
  );
};
