import { AccountTree, LinkedIn } from "libs/shared/assets/svg";
import styles from "./table-row-component.module.scss";

export const NameAndSpeciality = ({
  name,
  position,
  flow,
  linkedin,
  id,
  dataType,
  parent_dso_id,
}: {
  name: string;
  position: string;
  linkedin?: string;
  flow?: boolean;
  id: string | number;
  dataType?: string;
  parent_dso_id?: string;
}) => {
  return (
    <div className={styles.name_position}>
      <section>
        <p
          className={styles.name}
          onClick={() => {
            const origin = window.location.origin;
            window.open(`${origin}/dentist-info?id=${id}&type=${dataType}`, "_blank");
            // navigate("/info");
          }}>
          {name}
        </p>
        <span className={styles.position}>{position}</span>
      </section>
      <div className={styles.iconContainer}>
      <span style={{ opacity: linkedin ? 1 : 0 }}>
        {linkedin?.trim() != "" && <a href={linkedin} target="_blank"><LinkedIn /></a>}
      </span>
      <span style={{ opacity: flow ? 1 : 0 }}>
        {parent_dso_id &&
          <a href={`${origin}/info?id=${id}&type=${dataType}`} target="_blank"><AccountTree /></a>
        }
      </span>
      </div>
    </div>
  );
};
