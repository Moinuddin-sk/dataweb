import { useCallback, useEffect, useState } from "react";
import styles from "./feature-location-practice.module.scss";
import {
  Table,
  AutoComplete,
  MultiSelect,
  LocationSelect,
} from "libs/shared/core-ui";
import { PersonalInfoRes, PersonInfo } from "pages/feature-dental-lab";
import { HeaderProps } from "libs/shared/core-ui/table/models/table.model";
import {
  
  ComapnyAndUrl,
  EmailAndPhone,
} from "pages/feature-dso-corporate/components/table-row-component";
import { NameAndSpeciality} from "./component/table-row-component";
import axios from "axios";
import { OwnerShip, title_level } from "constants/drop-down-options";
const defaultFilter = {
  contact_first_name: "",
  contact_last_name: "",
  title: "",
  dso_name: "",
  title_level: [],
  ownership: [],
  search_by_update: "",
  zip_code: "",
  distance: 25,
  country: "",
  state: "",
  city: ""
};
export const FeatureLocationPractice = () => {
  const [filledValue, setFilledValue] = useState("");
  const [selected, setSelected] = useState<PersonInfo[]>([]);
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
      label: "Name & Specialty",
      field: "nameAndSpeciality",
      cssClass: "w-name",
      Component({ data }) {
        return (
          <NameAndSpeciality
            name={data.nameAndSpeciality.name}
            position={data.nameAndSpeciality.speciality}
            linkedin={data?.nameAndSpeciality?.linkedinURL}
            flow={data?.flow}
            id={data.id}
            dataType="2location"
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
        `${import.meta.env.VITE_BASE_HOST}/dso/2location-dentist?page=${
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
  const onSelect = (data: string | string[], key: string) => {
    setFilter((prev) => ({ ...prev, [key]: data }));
    setPagination((prev) => ({ ...prev, page: 0 }));
  };
  useEffect(() => {
    prepareFilledValue();
  }, [filter]);
  const prepareFilledValue = () => {
    console.log(filter)
    if (filter.zip_code.length >= 5) {
      const filledValue = filter.zip_code.length >= 5 ? filter.distance + ' miles within ' + filter.zip_code : '';
      setFilledValue(filledValue);
    } else if (filter.country.length >= 3) {
      const filledValue = filter.country.length >= 3 ? filter.country + " " + filter.state + " " + filter.city : '';
      console.log(filledValue)
      setFilledValue(filledValue);
    }
  }
  return (
    <div className={styles.filter_result_container}>
      <div className={styles.filter_container}>
        <AutoComplete
          placeholder="First Name"
          value={filter.contact_first_name}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-first-names`}
          onSelect={(data) => {
            onSelect(data, "contact_first_name");
          }}
        />
        <AutoComplete
          placeholder="Last Name"
          value={filter.contact_last_name}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-last-names`}
          onSelect={(data) => {
            onSelect(data, "contact_last_name");
          }}
        />
        <AutoComplete
          placeholder="Practice Name"
          value={filter.dso_name}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-companies`}
          onSelect={(data) => {
            onSelect(data, "dso_name");
          }}
        />
        <AutoComplete
          placeholder="Title"
          value={filter.title}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-titles`}
          onSelect={(data) => {
            onSelect(data, "title");
          }}
          initialCall
        />
        <MultiSelect
          options={title_level}
          placeholder="Level"
          value={filter.title_level}
          onSelect={(data) => {
            onSelect(data, "title_level");
          }}
        />
        <MultiSelect
          placeholder="Ownership"
          value={filter.ownership}
          options={OwnerShip}
          onSelect={(data) => {
            onSelect(data, "ownership");
          }}
        />
        {/* <AutoComplete
          placeholder="Search by update"
          value={filter.search_by_update}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-levels`}
          
          onSelect={(data) => {
            onSelect(data, "title_level");
          }}
        />
        <AutoComplete
          placeholder="Location"
          value={filter.zip_code}
          api={`${import.meta.env.VITE_BASE_HOST}/master/get-levels`}
          
          onSelect={(data) => {
            onSelect(data, "title_level");
          }}
        /> */}
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
  );
};