/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import styles from "./feature-dso-corporate.module.scss";
import {
  FeatureDentalLab,
  PersonalInfoRes,
  PersonInfo,
} from "pages/feature-dental-lab";
import { HeaderProps } from "libs/shared/core-ui/table/models/table.model";
import {
  NameAndSpeciality,
  ComapnyAndUrl,
  EmailAndPhone,
} from "./components/table-row-component";
import { Table, AutoComplete, MultiSelect, LocationSelect } from "libs/shared/core-ui";
import { FeatureAllDentist } from "pages/feature-all-dentist";
import { FeatureDSODentist } from "pages/feature-dso-dentist";
import { FeatureLocationPractice } from "pages/feature-location-practice";
import { FeatureReverseLookUp } from "pages/feature-reverse-lookup";
import { FeatureTopDSO } from "pages/feature-top-dso";
import { FeatureUniqueDSO } from "pages/feature-unique-dso";
import axios from "axios";
import {
  OwnerShip,
  PracticeLocationRange,
  title_level,
} from "constants/drop-down-options";
import { useLocation } from "react-router-dom";
import { FeatureIndependentDentist } from "pages/feature-independent-dentist";
import { FeatureOrgChart } from "pages/feature-org-chart";
import { DsoInfoOverlay } from "./components/dso-info-overlay";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const defaultFilter = {
  contact_first_name: "",
  contact_last_name: "",
  company_name: "",
  title: "",
  title_level: [],
  ownership: [],
  dso_size: [],
  search_by_update: "",
  zip_code: "",
  distance: 25,
  country: "",
  state: "",
  city: "",
  intent_keywords: [],
};
export const FeatureDSOCorporate = () => {
  const query = useQuery();
  // /search?tab=DSO Corporate
  const tab = query.get("tab") || "dsocorporate";
  const [selected, setSelected] = useState<PersonInfo[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, pageLimit: 10 });
  const [filter, setFilter] = useState({
    ...defaultFilter,
  });
  const [data, setData] = useState<PersonalInfoRes | null>(null);
  const [filledValue, setFilledValue] = useState("");
  const [isActiveOverlay, setIsActiveOverlay] = useState<Boolean>(false)
  const [overlayData, setOverlayData] = useState<{
    id?: string | number,
    dataType? : string
  }>({id: 0, dataType: ""})

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_HOST}/dso/corporate?page=${
          pagination.page
        }&size=${pagination.pageLimit}`,
        {
          filter: filter,
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [pagination]);
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    prepareFilledValue();
  }, [filter]);
  const prepareFilledValue = () => {
    if (filter.zip_code.length >= 5) {
      const filledValue = filter.zip_code.length >= 5 ? filter.distance + ' miles within ' + filter.zip_code : '';
      setFilledValue(filledValue);
    } else if (filter.country.length >= 3) {
      const filledValue = filter.country.length >= 3 ? filter.country + " " + filter.state + " " + filter.city : '';
      console.log(filledValue)
      setFilledValue(filledValue);
    }
  }
  const getName = (name: any) => {
    let splitStr = name.split(" ");
    let first = splitStr[0].slice(0, 1);
    let last = splitStr[splitStr.length - 1].slice(0, 1);
    return first + last
  }
  const toggleOverlay = (isActive : Boolean, id?: string | number, dataType? : string) => {
    console.log(id, dataType, isActive)
    setIsActiveOverlay(isActive)
    if (isActive)
      setOverlayData({ id, dataType})
  }
  const headers: HeaderProps<PersonInfo, keyof PersonInfo>[] = [
    {
      label: "",
      cssClass:"w-avatar",
      field: "id",
      Component({ data }) {
        return (
          <span className={styles.title_card}>
            {getName(data.nameAndSpeciality.name)}
          </span>
        );
      },
    },
    {
      label: "Name & Title",
      cssClass: "w-name",
      field: "nameAndSpeciality",
      Component({ data }) {
        return (
          <NameAndSpeciality
            name={data.nameAndSpeciality.name}
            position={data.nameAndSpeciality.speciality}
            linkedin={data?.nameAndSpeciality?.linkedinURL}
            // flow={data?.flow}
            // linkedin={true}
            flow={true}
            dataType={"dso_corporate"}
            id={data.id}
            parent_dso_id={data.parentDsoId}
            toggleOverlay={toggleOverlay}
          />
        );
      },
    },
    {
      label: "Parent Company Name & Web Address",
      field: "companyAndUrl",
      cssClass: "w-company",
      Component({ data }) {
        return (
          <ComapnyAndUrl
            name={data.companyAndUrl.companyName}
            url={data.companyAndUrl.webAddress}
            id=""
            dsoAddress=""
          />
        );
      },
    },
    {
      label: "Email & Phone",
      field: "emailAndPhone",
      cssClass: "w-email",
      Component({ data }) {
        return (
          <EmailAndPhone
            email={data.emailAndPhone.email}
            phone={data.emailAndPhone.phone}
          />
        );
        return <>{data.emailAndPhone.email}</>;
      },
    },
    {
      label: "Last Updated",
      field: "lastUpdated",
      cssClass: "w-last",
      Component({ data }) {
        return <span className={styles.updatedAt}>{data.lastUpdated}</span>;
      },
    },
  ];
  const labels = [
    { label: "DSO Corporate", key:"dsocorporate"},
    { label: "DSO Dentists", key: "dsodentist" },
    { label: "Dental Labs", key: "dentallabs" },
    { label: "Unique DSO", key: "uniquedso" },
    { label: "Org Chart", key: "orgchart" },
    { label: "All Dentists", key: "alldentist" },
    { label: "2 Location Practices", key: "locationpractice" },
    { label: "Top 300 DSOs", key: "topdso" },
    { label: "Reverse PE Lookup", key: "reversepe" },
    { label: "Independent Dentists", key: "independentdentist" },

  ];

  // "DSO Dentists",
  //   "Dental Labs",
  //   "Unique DSO",
  //   "Org Chart",
  //   "All Dentists",
  //   "2 Location Practices",
  //   "Top 300 DSOs",
  //   "Reverse PE Lookup",
  //   "Independent Dentists",
  const dataHandler = (data: any) => {
    return data?.suggestions
      ?.map((el: string) => ({
        value: el,
        label: el,
      }))
      .filter((el: any) => !!el.value);
  };
  const onSelect = (data: string | string[], key: string) => {
    setFilter((prev) => ({ ...prev, [key]: data }));
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  return (
    <div className={styles.container}>
      {/* <h4 className={styles.header}>Search By</h4> */}
      <ul className={styles.tab}>
        {labels?.map((el) => {
          return (
            <li
              className={el.key === activeTab ? styles.active : ""}
              key={el.key}
              onClick={() => {
                setActiveTab(el.key);
              }}>
              {el.label}
              <span />
            </li>
          );
        })}
      </ul>

      {activeTab === "dentallabs" && <FeatureDentalLab />}
      {activeTab === "dsocorporate" && (
        <div className={styles.filter_result_container}>
          <div className={styles.filter_container}>
            <AutoComplete
              value={filter.contact_first_name}
              onSelect={(data) => {
                onSelect(data, "contact_first_name");
              }}
              placeholder="First Name"
              api={`${import.meta.env.VITE_BASE_HOST}/master/get-first-names`}
              dataHandler={dataHandler}
            />
            <AutoComplete
              value={filter.contact_last_name}
              onSelect={(data) => {
                onSelect(data, "contact_last_name");
              }}
              placeholder="Last Name"
              api={`${import.meta.env.VITE_BASE_HOST}/master/get-last-names`}
              dataHandler={dataHandler}
            />
            <AutoComplete
              placeholder="DSO Name"
              value={filter.company_name}
              api={`${import.meta.env.VITE_BASE_HOST}/master/get-companies`}
              dataHandler={dataHandler}
              onSelect={(data) => {
                onSelect(data, "company_name");
              }}
            />
            <AutoComplete
              placeholder="Title"
              value={filter.title}
              api={`${import.meta.env.VITE_BASE_HOST}/master/get-titles`}
              dataHandler={dataHandler}
              onSelect={(data) => {
                onSelect(data, "title");
              }}
            />
            <MultiSelect
              options={title_level}
              placeholder="Level"
              value={filter.title_level || []}
              onSelect={(data) => {
                onSelect(data, "title_level");
              }}
            />
            <MultiSelect
              options={OwnerShip}
              placeholder="Ownership"
              value={filter.ownership || null}
              onSelect={(data) => {
                onSelect(data, "ownership");
              }}
            />
            <MultiSelect
              options={PracticeLocationRange}
              placeholder="DSO Size"
              value={filter.dso_size}
              onSelect={(data) => {
                onSelect(data, "dso_size");
              }}
            />
            <LocationSelect
              filledValue={filledValue}
              placeholder="Location"
              value={filter.distance}
              zipcode={filter.zip_code}
              onSelect={(data) => {
                onSelect(data, "distance");
              }}
              onZipcodeChange={(value) => {
                onSelect(value, "zip_code");
              }}
              onCountrySelect={(data) => {
                onSelect(data, "country");
              }}
              countryValue={filter.country || ""}
              onStateSelect={(data) => {
                onSelect(data, "state");
              }}
              stateValue={filter.state || ""}
              onCitySelect={(data) => {
                onSelect(data, "city");
              }}
              cityValue={filter.city || ""}
            />
            <div className={styles.actionContainer}>
            <button
              className={styles.btn}
              onClick={() => {
                setFilter({ ...defaultFilter });
                setPagination((prev) => ({ ...prev, page: 0 }));
                setFilledValue("");
              }}>
              Clear All
            </button>
            </div>
          </div>
          <div className={styles.result_container}>
            <Table
              loading={loading}
              intentValue={filter.intent_keywords}
              onIntentSelect={(data) => {
                onSelect(data, "intent_keywords");
              }}
              headers={headers}
              data={data?.data || []}
              uniqueKey={"id"}
              onSelect={(data) => {
                if (Array.isArray(data)) setSelected(data);
                else {
                  const dataExist = selected.find((el) => el.id === data.id);
                  setSelected((prev) => {
                    if (dataExist) {
                      return prev.filter((el) => el.id != data.id);
                    }
                    return [...prev, data];
                  });
                }
              }}
              selected={selected}
              pagination={{
                limit: pagination.pageLimit,
                page: pagination.page,
                total: +(data?.pagination?.totalItems || 0),
                onPagination(page: number) {
                  setPagination((prev) => ({ ...prev, page }));
                },
                onRowsPerPage(pageLimit: number) {
                  setPagination((prev) => ({ ...prev, pageLimit }));
                },
              }}
            />
          </div>
        </div>
      )}
      {activeTab === "alldentist" && <FeatureAllDentist />}
      {"dsodentist" === activeTab && <FeatureDSODentist />}
      {activeTab === "locationpractice" && <FeatureLocationPractice />}
      {"reversepe" === activeTab && <FeatureReverseLookUp />}
      {"independentdentist" === activeTab && <FeatureIndependentDentist />}
      {activeTab === "topdso" && <FeatureTopDSO />}
      {"uniquedso" === activeTab && <FeatureUniqueDSO />}
      {"orgchart" === activeTab && <FeatureOrgChart />}
     
      <DsoInfoOverlay 
        isActiveOverlay={isActiveOverlay} 
        id={overlayData.id} 
        dataType={overlayData.dataType} 
        toggleOverlay={toggleOverlay}
      />
    </div>
  );
};
