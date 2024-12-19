/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import axios from "axios";
import { Pagination } from "libs/shared/core-ui/table/components/pagination/pagination";
import { useCallback, useEffect, useState } from "react";

// http://localhost:8080/api/dso/org-chart/get-parent-practice-locations?parent_dso_id=SSPDS000001&page=0&size=5
// http://localhost:8080/api/dso/org-chart/get-parent-contacts?parent_dso_id=SSPDS000001&page=0&size=5

export const ApiPractice = ({
  endpoint,
  parent_dso_id,
  Component,
}: {
  endpoint: string;
  parent_dso_id: string;
  Component: ({ data }: { data: any }) => JSX.Element;
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: any; pagination: any }>({
    data: [],
    pagination: {
      currentPage: 0,
      totalItems: 0,
      totalPages: 0,
    },
  });
  const [pagination, setPagination] = useState({ page: 0, pageLimit: 5 });
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_HOST
        }/dso/org-chart/${endpoint}?parent_dso_id=${parent_dso_id}&page=${
          pagination.page
        }&size=${pagination.pageLimit}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, pagination.page, pagination.pageLimit, parent_dso_id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          {data?.data?.map((el: any, index: string) => {
            return <Component key={index + ""} data={el} />;
          })}
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
  );
};
