/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiSelect, Table, LocationSelect } from "libs/shared/core-ui";
import styles from "./feature-dental-lab.module.scss";
import { HeaderProps } from "libs/shared/core-ui/table/models/table.model";
import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "libs/shared/core-ui/auto-complete";
import axios from "axios";
import { Department, title_level } from "constants/drop-down-options";
import {
  NameAndSpeciality,
  ComapnyAndUrl,
  EmailAndPhone,
} from "pages/feature-dental-lab/components/table-row-component";
export interface PersonInfo {
  id: string;
  parentDsoId?: string;
  peFirm?: string[];
  noOfPractice?: string[];
  nameAndSpeciality: {
    name: string;
    speciality: string;
    linkedinURL: string;
    patentCompany: string;
  };
  companyAndUrl: {
    companyName: string;
    webAddress: string;
  };
  emailAndPhone: {
    email: string[];
    phone: string[];
  };
  lastUpdated: string;
  linkedIn?: boolean;
  flow?: boolean;
}
export interface PersonalInfoRes {
  data: PersonInfo[];
  pagination: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
}
const defaultFilter = {
  contact_full_name: "",
  title_level: [],
  title: "",
  company: "",
  department: [],
  zip_code: "",
  distance: 25,
  country:"",
  state: "",
  city: ""
};
export const FeatureDentalLab = () => {
  const [selected, setSelected] = useState<PersonInfo[]>([]);
  const [filledValue, setFilledValue] = useState("");
  const [pagination, setPagination] = useState({ page: 0, pageLimit: 10 });
  const [filter, setFilter] = useState({
    ...defaultFilter,
  });
  const [data, setData] = useState<PersonalInfoRes | null>(null);
  const [loading, setLoading] = useState(true);
  const getName = (name: any) => {
    let splitStr = name.split(" ");
    let first = splitStr[0].slice(0, 1);
    let last = splitStr[splitStr.length - 1].slice(0, 1);
    return first + last
  }
  const headers: HeaderProps<PersonInfo, keyof PersonInfo>[] = [
    {
      label: "",
      field: "id",
      cssClass: "w-avatar",
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
      field: "nameAndSpeciality",
      cssClass: "w-name",
      Component({ data }) {
        return (
          <NameAndSpeciality
            name={data.nameAndSpeciality.name}
            position={data.nameAndSpeciality.speciality}
            linkedin={data?.nameAndSpeciality?.linkedinURL}
            id={data.id}
            dataType={`dental`}
          />
        );
      },
    },
    {
      label: "Company & URL",
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_HOST}/dso/dental?page=${
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
    fetchData();
  }, [fetchData]);

  const dataHandler = (data: any) => {
    return data?.suggestions?.map((el: string) => ({
      value: el,
      label: el,
    }));
  };
  const onSelect = (data: string | string[], key: string) => {
    setFilter((prev) => ({ ...prev, [key]: data }));
    if (key == 'zip_code'){
      if(data.length>=5)
      setPagination((prev) => ({ ...prev, page: 0 }));
    }else{
      setPagination((prev) => ({ ...prev, page: 0 }));
    }
    
  };
  useEffect(() => {
    prepareFilledValue();
  }, [filter]);
  const prepareFilledValue = () => {
    if (filter.zip_code.length >= 5){
      const filledValue = filter.zip_code.length >= 5 ? filter.distance + ' miles within ' + filter.zip_code : '';
      setFilledValue(filledValue);
    } else if (filter.country.length>=3){
      const filledValue = filter.country.length >= 3 ? filter.country+" "+filter.state+" "+filter.city : '';
      setFilledValue(filledValue);
    } 
  }
  return (
    <div className={styles.filter_result_container}>
      <div className={styles.filter_container}>
        <AutoComplete
          value={filter.contact_full_name}
          onSelect={(data) => {
            onSelect(data, "contact_full_name");
          }}
          placeholder="Person Name"
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-names`}
          dataHandler={dataHandler}
        />
        <AutoComplete
          placeholder="Company"
          value={filter.company}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-companies`}
          dataHandler={dataHandler}
          onSelect={(data) => {
            onSelect(data, "company");
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
          options={Department}
          placeholder="Department"
          value={filter.department || []}
          onSelect={(data) => {
            onSelect(data, "department");
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
          onCountrySelect={(data)=>{
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
          total: data?.pagination?.totalItems || 0,
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
  );
};
