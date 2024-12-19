import { Corporate, TreeViewArrow } from "libs/shared/assets/svg";
import {
  CompanyData,
  Subsidiary,
  PracticeLocation,
  Company,
} from "pages/feature-org-chart/models";
import styles from "./tree-view.module.scss";
import { Checkbox } from "antd";
import { useMemo, useState } from "react";

export const TreeView = ({
  data,
  selected,
  onSelect,
}: {
  data: CompanyData;
  selected: PracticeLocation[];
  onSelect: (practiceLocation: PracticeLocation[]) => void;
}) => {
  return (
    <div className={`${styles.org_scroll}`}>
      {/* <div className={`${styles.table_tools_conatiner_xp}`}>
        {data.pagination && (
          <div className={styles.record}>
            Record: {data.pagination?.totalItems || 0}
          </div>
        )}

        <div
          className={`${styles.tools} ${
            selected.length !== 0 ? styles.active : ""
          }`}>
          <Save />
          <Download />
          <Salesforce />
          <Hubspot />
        </div>
      </div> */}
      {data?.data?.map((org) => {
        return (
          <OrgTreeView
            org={org}
            key={org.company.parent_dso_id}
            onSelect={onSelect}
            selected={selected}
            parent_dso_id={org.company.parent_dso_id}
          />
        );
      })}
    </div>
  );
};

export const OrgTreeView = ({
  org,
  selected,
  onSelect,
  parent_dso_id,
}: {
  org: Company;
  selected: PracticeLocation[];
  onSelect: (practiceLocation: PracticeLocation[]) => void;
  parent_dso_id: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.main_pain_container}>
      <section className={styles.parent_container}>
        {org.company.subsidiaries.length !== 0 ||
        org.company.practice_locations.length !== 0 ? (
          <span
            onClick={() => {
              setOpen((prev) => !prev);
            }}>
            <TreeViewArrow className={open ? styles.open : styles.close} />
          </span>
        ) : (
          <span className={styles.empty_gap}></span>
        )}
        <div>
          <p
            onClick={() => {
              const origin = window.location.origin;
              window.open(
                `${origin}/org-info?parent_dso_id=${parent_dso_id}`,
                "_blank"
              );
            }}>
            {org.company.name} <small>{`(Subsidiary: ${org.company.subsidiaries.length}, Practice location: ${org.company.practice_locations.length})` }</small>
          </p>
          {/* <span>{org.company.location_type}</span> */}
          <span>{org?.company?.location}</span>
        </div>
      </section>
      {open && org.company.subsidiaries.length !== 0 && (
        <div>
          {org.company.subsidiaries.map((subsidary) => (
            <SubsidiaryView
              key={subsidary.name}
              subsidiary={subsidary}
              onSelect={onSelect}
              selected={selected}
              subsidiary_id={subsidary.subsidiary_id}
            />
          ))}
        </div>
      )}
      {open && org.company.practice_locations.length !== 0 && (
        <div>
          {org.company.practice_locations.map((practiceLocation) => (
            <PracticeLocationView
              key={practiceLocation.practice_name}
              practiceLocation={practiceLocation}
              onSelect={onSelect}
              selected={selected}
              practice_location_id={practiceLocation.practice_location_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SubsidiaryView = ({
  subsidiary,
  selected,
  onSelect,
  subsidiary_id,
}: {
  subsidiary: Subsidiary;
  selected: PracticeLocation[];
  onSelect: (practiceLocation: PracticeLocation[]) => void;
    subsidiary_id: string;
}) => {
  const [open, setOpen] = useState(false);
  const isSelected = useMemo(() => {
    const arr = [];
    subsidiary.practice_locations.forEach((el) => {
      if (
        selected.findIndex((pr) => pr.practice_name === el.practice_name) !== -1
      ) {
        arr.push(el);
      }
    });
    return arr.length === subsidiary.practice_locations.length;
  }, [selected]);
  return (
    <div className={styles.subsidary_main_container}>
      <div className={styles.subsidary_container}>
        <span
          className={
            subsidiary.practice_locations.length === 0 ? styles.disable : ""
          }
          onClick={() => {
            if (subsidiary.practice_locations.length !== 0) {
              setOpen((prev) => !prev);
            }
          }}>
          <TreeViewArrow className={open ? styles.open : styles.close} />
        </span>
        <span
          className={
            subsidiary.practice_locations.length === 0 ? styles.disable : ""
          }>
          <Checkbox
            checked={isSelected}
            onClick={() => {
              if (subsidiary.practice_locations.length !== 0) {
                onSelect(subsidiary.practice_locations);
              }
            }}
          />
        </span>
        <Corporate />
        <div>
          <p
            onClick={() => {
              const origin = window.location.origin;
              window.open(
                `${origin}/subsidiary-info?subsidiary_id=${subsidiary_id}`,
                "_blank"
              );
            }}>
            {subsidiary.name}
          </p>
          <span>
            {subsidiary.subsidiary_web_address} (
            {subsidiary?.practice_locations?.length || 0})
          </span>
        </div>
      </div>
      {open && subsidiary.practice_locations.length !== 0 && (
        <section>
          {subsidiary.practice_locations.map((location) => (
            <PracticeLocationView
              key={location.practice_name}
              practiceLocation={location}
              selected={selected}
              onSelect={onSelect}
              practice_location_id={location.practice_location_id}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export const PracticeLocationView = ({
  practiceLocation,
  selected,
  onSelect,
  practice_location_id,
}: {
  practiceLocation: PracticeLocation;
  onSelect: (practiceLocation: PracticeLocation[]) => void;
  selected: PracticeLocation[];
  practice_location_id: string;
}) => {
  const isSelected = useMemo(() => {
    return (
      selected.findIndex(
        (el) => el.practice_name === practiceLocation.practice_name
      ) !== -1
    );
  }, [practiceLocation.practice_name, selected]);
  return (
    <section className={styles.practice_parent_container}>
      <span>
        <Checkbox
          checked={isSelected}
          onClick={() => {
            onSelect([practiceLocation]);
          }}
        />
      </span>
      <Corporate />
      <div>
        <p
          onClick={() => {
            const origin = window.location.origin;
            window.open(
              `${origin}/practice-info?practice_location_id=${practice_location_id}`,
              "_blank"
            );
          }}>
          {practiceLocation.practice_name}
        </p>
        <span>{practiceLocation.practice_address1}</span>
        <span>{practiceLocation.practice_state}</span>
      </div>
    </section>
  );
};
