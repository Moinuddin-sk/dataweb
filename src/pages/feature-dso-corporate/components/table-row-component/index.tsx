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
  toggleOverlay
}: {
  name: string;
  position: string;
  linkedin?: string;
  flow?: boolean;
  id: string | number;
  dataType?: string;
  parent_dso_id?: string;
  toggleOverlay: (isActive : Boolean, id?: string | number, dataType? : string) => void
}) => {

  return (
    <div className={styles.name_position}>
      <section>
        <p
          className={styles.name}
          onClick={() => toggleOverlay(true, id, dataType) }
          // onClick={() => {
            // const origin = window.location.origin;
            // window.open(`${origin}/info?id=${id}&type=${dataType}`, "_blank");
            // navigate("/info");
          // }}
          >
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

export const ComapnyAndUrl = ({ name, url, id, dsoAddress }: { name: string; url: string, id: string, dsoAddress:string }) => {
  return (
    <div>
      {id.trim() != "" ?
      <p
          className={styles.name}
          onClick={() => {
            const origin = window.location.origin;
            window.open(
              `${origin}/org-info?parent_dso_id=${id}&type=dso`,
              "_blank"
            );
          }}>{name}</p>
        : <p className={styles.company_name}>{name}</p>
        }
      
      {dsoAddress.trim() != "" && <span className={styles.url}>{dsoAddress}</span>}
      {url.trim() != "" && <a href={url} target="_blank"><span className={styles.url}>{url}</span></a>}
    </div>
  );
};

export const EmailAndPhone = ({
  email,
  phone,
}: {
  email?: string[];
  phone?: string[];
}) => {
  return (
    <div>
      {phone && <span className={styles.phone}>{phone?.join(",")}</span>}
      {email && <p className={styles.email}>{email?.join(",")}</p>}
    </div>
  );
};