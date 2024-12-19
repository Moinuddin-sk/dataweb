import { NameAndSpeciality } from "pages/feature-dso-corporate/components/table-row-component";
import styles from "./contact-card.module.scss";
import { Contact } from "..";

export const ContactCard = ({ data }: { data: Contact }) => {
  return (
    <section className={styles.practice_parent_container}>
      <NameAndSpeciality
        name={data.contact_full_name}
        position={data.title}
        linkedin={data?.contact_linkedin_url}
        flow={false}
        id={data.contact_id}
      />
    </section>
  );
};
