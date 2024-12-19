import { useCallback, useEffect, useState } from "react";
import styles from "./feature-unique-dso.module.scss";
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
} from "./components/table-row-component";
import axios from "axios";
import { OwnerShip, PracticeLocationRange } from "constants/drop-down-options";
const defaultFilter = {
  company_name: "",
  ownership: [],
  dso_size: [],
  search_by_update: "",
  zip_code: "",
  distance: 25,
  country:"",
  state:"",
  city:"",
};
export const FeatureUniqueDSO = () => {
  const [filledValue, setFilledValue] = useState("");
  const [selected, setSelected] = useState<PersonInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, pageLimit: 10 });
  const [filter, setFilter] = useState({
    ...defaultFilter,
  });
  const [data, setData] = useState<PersonalInfoRes | null>(null);
  
  const headers: HeaderProps<PersonInfo, keyof PersonInfo>[] = [
    {
      label: "",
      field: "id",
      cssClass: "w-avatar",
      Component({ data }) {
        return (
          data.companyAndUrl.webAddress.length>5 ?
            <a href={`${data.companyAndUrl.webAddress}`} target="_blank"><img src={`https://logo.clearbit.com/${data.companyAndUrl.webAddress}?size=40`}></img></a>
          :
          <span className={styles.title_card}>
            {data.companyAndUrl.companyName.slice(0, 2)}
          </span>
        );
      },
    },
    // {
    //   label: "Name & Speciality",
    //   field: "nameAndSpeciality",
    //   Component({ data }) {
    //     return (
    //       <NameAndSpeciality
    //         name={data.nameAndSpeciality.name}
    //         position={data.nameAndSpeciality.speciality}
    //         linkedin={data?.nameAndSpeciality?.linkedinURL}
    //         flow={data?.flow}
    //         id={data.id}
    //       />
    //     );
    //   },
    // },
    {
      label: "Company & URL",
      field: "companyAndUrl",
      cssClass: "w-name",
      Component({ data }) {
        return (
          <ComapnyAndUrl
            name={data.companyAndUrl.companyName}
            url={""}
            dsoAddress={data.companyAndUrl.webAddress}
            id={data.id}
          />
        );
      },
    },
    {
      label: "State & City",
      field: "emailAndPhone",
      cssClass: "w-company-top",
      align: 'center',
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
      label: "Number of Practices",
      field: "emailAndPhone",
      cssClass: "w-email-top",
      align: 'center',
      Component({ data }) {
        return (
          <EmailAndPhone
            email={data.noOfPractice}
            phone={[]}
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
        `${import.meta.env.VITE_BASE_HOST}/dso/unique-dentist?page=${
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
        {/* <div> */}
          <AutoComplete
            placeholder="DSO Name"
            value={filter.company_name}
            api={`${import.meta.env.VITE_BASE_HOST}/master/get-companies`}
            onSelect={(data) => {
              onSelect(data, "company_name");
            }}
          />
          <MultiSelect
            options={OwnerShip}
            placeholder="Ownership"
            value={filter.ownership}
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
        {/* </div> */}
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
