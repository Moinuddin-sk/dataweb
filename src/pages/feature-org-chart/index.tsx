import { Spin } from "antd";
import { useCallback, useState, useEffect } from "react";
import { AlphabetFilters } from "./components/alphabet-filters";
import { TreeView } from "./components/tree-view";
import { PracticeLocation, CompanyData } from "./models";
import { Pagination } from "libs/shared/core-ui/table/components/pagination/pagination";
import { SearchOrg } from "./components/search";
import { AutoComplete } from "libs/shared/core-ui";
import styles from "./feature-org-chart.module.scss";
import axios from "axios";
export const FeatureOrgChart = () => {
  const [selected, setSelected] = useState<PracticeLocation[]>([]);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [suggestionVal, setSuggestionVal] = useState("");
  // const [selectedSearchVal, setSelectedSearchVal] = useState("");
  // const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: any; pagination: any }>({
    data: [],
    pagination: {
      currentPage: 0,
      totalItems: 0,
      totalPages: 0,
    },
  });
  const [pagination, setPagination] = useState({ page: 0, pageLimit: 10 });

  const setSelectedTab = (el:any) => {
    setSelectedLetter(el);
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_HOST}/dso/org-chart/get-data?key=${selectedLetter}&page=${pagination.page
          }&size=${pagination.pageLimit}`
      );
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageLimit, selectedLetter]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // const getSuggestion = useCallback(async () => {
  //   // setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_HOST}/master/get-org-chart-suggestion?key=${selectedLetter}`
  //     );
  //     setData(response?.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // }, [pagination.page, pagination.pageLimit, selectedLetter]);

  // const fetchTreeData = () => (
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_HOST}/dso/org-chart/get-data`
  //     );
  //     setData(response?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const dataHandler = (data: { suggestions?: string[] }) => {
    return data?.suggestions?.map((el: string) => ({
      value: el,
      label: el,
    }));
  };
  return (
    <div className={styles.filter_result_container}>
      <div className={styles.filter_container}>
      <AutoComplete
        value={suggestionVal}
        onSelect={(data) => {
          setSuggestionVal(data);
          setSelectedLetter(data);
          // data.length > 3 ? fetchData : '';
        }}
        placeholder="Search Org chart"
        api={`${import.meta.env.VITE_BASE_HOST}/master/get-org-chart-suggestion`}
        dataHandler={dataHandler}
      />
        <div className={styles.actionContainer}>
          <button
              className={styles.btn}
            onClick={() => {
              setPagination((prev) => ({ ...prev, page: 0 }));
              setSelectedLetter("All");
              setSuggestionVal("");
            }}>
            Clear All
          </button>
        </div>
      </div>
      {/* <SearchOrg onValueChange={(v)=>{
          if(v.length>3) 
            setSelectedLetter(v);
      }} onSearch={() => {selectedLetter.length>3 ? fetchData : ''}} /> */}
      <div className={styles.result_container}>
      <AlphabetFilters onSelect={setSelectedTab} value={selectedLetter}/>
      <div>
        {loading ? (
          <Spin />
        ) : (
            <>
              {data && <TreeView
                data={data}
                selected={selected}
                onSelect={(practice_locations) => {
                  setSelected((prev) => {
                    const newArr: PracticeLocation[] = [];
                    let previousArr: PracticeLocation[] = [...prev];
                    practice_locations.map((el) => {
                      const index = prev.findIndex(
                        (PR) => PR.practice_name === el.practice_name
                      );
                      if (index === -1) {
                        newArr.push(el);
                      } else {
                        previousArr = previousArr.filter(
                          (PR) => el.practice_name !== PR.practice_name
                        );
                      }
                    });
                    return [...newArr, ...previousArr];
                  });
                }}
              />}
              {pagination && (
                <Pagination
                  removeBorder
                  total={data.pagination.totalItems}
                  page={pagination.page}
                  limit={pagination.pageLimit}
                  onPagination={(page: number) => {
                    setPagination((prev) => ({ ...prev, page }));
                  }}
                  onRowsPerPage={(pageLimit: number) => {
                    setPagination((prev) => ({ ...prev, pageLimit }));
                  }}
                />
              )}
            </>
        )}
      </div>
    </div>
    </div>
  );
};
