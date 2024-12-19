import { useCallback, useState, useEffect } from "react";
import {
  AccountTree,
  BioTech,
  Corporate,
  Dentistry,
} from "libs/shared/assets/svg";
import AllDentist from "libs/shared/assets/all_Dentist.png";
import IDentist from "libs/shared/assets/Independent_dentist.png";
import ReversePE from "libs/shared/assets/Revrse_PE_lookup.png";
import UDentist from "libs/shared/assets/Uniq_Dentist.png";
import styles from "./feature-home.module.scss";
import { Table } from "libs/shared/core-ui";
import { HeaderProps } from "libs/shared/core-ui/table/models/table.model";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "antd";
import Banner1 from "libs/shared/assets/banner1.png";
import Banner2 from "libs/shared/assets/banner2.png";
export interface HomeTableProps {
  dso_size: string;
  mobile: string;
  small: string;
  mid_market: string;
  elite: string;
  uncategory: string;
  total: string;
}
export interface DashboardCount {
  org_charts: number,
  reverse_lookup: number,
  unique_dso: number,
  dso_dentist: number,
  dental_lab: number,
  dso_corporates: number,
  all_dentist: number,
  independent_dentist: number
}

export const FeatureHome = () => {
  const [dashboardData, setDashboardData] = useState<DashboardCount | null>(null);
  const navigate = useNavigate();
  
  const header: HeaderProps<HomeTableProps, keyof HomeTableProps>[] = [
    { field: "dso_size", label: "DSO Size", cssClass:"w-15" },
    { field: "mobile", label: "Mobile", cssClass: "w-15" },
    { field: "small", label: "Small", cssClass: "w-15" },
    { field: "mid_market", label: "Mid-Market", cssClass: "w-15" },
    { field: "elite", label: "Elite", cssClass: "w-15" },
    { field: "uncategory", label: "Uncategorized", cssClass: "w-15" },
    { field: "total", label: "Total", cssClass: "w-10" },
  ];
  const data: HomeTableProps[] = [
    {
      dso_size: "USA",
      mobile: "17",
      small: "2,335",
      mid_market: "418",
      elite: "69",
      uncategory: "109",
      total: "2,948",
    },
    {
      dso_size: "International",
      mobile: "4",
      small: "73",
      mid_market: "73",
      elite: "18",
      uncategory: "0",
      total: "168",
    },
    {
      dso_size: "Total",
      mobile: "21",
      small: "2,408",
      mid_market: "491",
      elite: "87",
      uncategory: "109",
      total: "3,116",
    },
  ];
  const fetchdData = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_HOST}/master/get-dashboard-data`
      );
      setDashboardData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchdData();
  }, []);
  const cardData = [
    {
      name: "DSO Corporate",
      count: "28,656",
      Icon: Corporate,
      buttonName: "Search Corporates",
      onClick: () => {
        navigate("/search?tab=DSO Corporate");
      },
    },
    {
      name: "DSO Dentists",
      count: "70,199",
      Icon: Dentistry,
      buttonName: "Search Dentists",
      onClick: () => {
        navigate("/search?tab=DSO Dentist");
      },
    },
    {
      name: "Dental Labs",
      count: "70,199",
      Icon: BioTech,
      buttonName: "Search Dental Labs",
      onClick: () => {
        navigate("/search?tab=Dental Labs");
      },
    },
    {
      name: "Org Chart",
      count: "3,116",
      Icon: AccountTree,
      buttonName: "Search Org Chart",
      onClick: () => {
        navigate("/search?tab=Org Chart");
      },
    },
    {
      name: "Unique DSO",
      count: "400",
      Icon: UDentist,
      iconType: "png",
      buttonName: "Search DSO",
      onClick: () => {
        navigate("/search?tab=Unique DSO");
      },
    },
    {
      name: "All Dentists",
      count: "13,987",
      Icon: AllDentist,
      iconType: 'png',
      buttonName: "Search All Dentists",
      onClick: () => {
        navigate("/search?tab=All Dentist");
      },
    },
    {
      name: "Independent Dentists",
      count: "515",
      Icon: IDentist,
      iconType: "png",
      buttonName: "Search Independent Dentists",
      onClick: () => {
        navigate("/search?tab=Independent Dentist");
      },
    },
    {
      name: "Reverse PE Lookup",
      count: "610",
      Icon: ReversePE,
      iconType: "png",
      buttonName: "Search Reverse PE",
      onClick: () => {
        navigate("/search?tab=Reverse PE Lookup");
      },
    },
  ];
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Search By</h3>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <section>
            <Corporate />
            <h5>{`DSO Corporate`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.dso_corporates || 0}</p>
            <button className={styles.btn} onClick={()=>{
              navigate("/search?tab=dsocorporate");
            }}>
              {`Search Corporate`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            <Dentistry />
            <h5>{`DSO Dentists`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.dso_dentist || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=dsodentist");
            }}>
              {`Search Dentists`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            <BioTech />
            <h5>{`Dental Labs`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.dental_lab || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=dentallabs");
            }}>
              {`Search Dental Labs`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            <AccountTree />
            <h5>{`Org Chart`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.org_charts || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=orgchart");
            }}>
              {`Search Org Chart`}
            </button>
          </div>
        </div>
        {/* <div className={styles.card}>
          <section>
            <Corporate />
            <h5>{`DSO Corporate`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.dso_corporates}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=DSO Corporate");
            }}>
              {`Search Corporates`}
            </button>
          </div>
        </div> */}
        <div className={styles.card}>
          <section>
            {/* <UDentist /> */}
            <img src={UDentist} />
            <h5>{`Unique DSO`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.unique_dso || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=uniquedso");
            }}>
              {`Search DSO`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            {/* <AllDentist /> */}
            <img src={AllDentist} />
            <h5>{`All Dentists`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.all_dentist || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=alldentist");
            }}>
              {`Search All Dentists`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            <img src={IDentist} />
            {/* <IDentist /> */}
            <h5>{`Independent Dentists`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.independent_dentist || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=independentdentist");
            }}>
              {`Search Independent Dentists`}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <section>
            <img src={ReversePE} />
            {/* <ReversePE /> */}
            <h5>{`Reverse PE Lookup`}</h5>
          </section>
          <div>
            <p className={styles.count}>{dashboardData?.reverse_lookup || 0}</p>
            <button className={styles.btn} onClick={() => {
              navigate("/search?tab=reversepe");
            }}>
              {`Search PE`}
            </button>
          </div>
        </div>







        {/* {cardData.map((data) => {
          return (
            <div className={styles.card}>
              <section>
                {data.iconType ? <img src={data.Icon} /> : <data.Icon />}
                <h5>{data.name}</h5>
              </section>
              <div>
                <p className={styles.count}>{data.count}</p>
                <button className={styles.btn} onClick={data?.onClick}>
                  {data.buttonName}
                </button>
              </div>
            </div>
          );
        })} */}
      </div>
      <Table
        headers={header}
        data={data}
        uniqueKey={"mobile"}
        title={"Company Count"}
        loading={false}
      />

      <div className={styles.imageContainer}>
        <Carousel autoplay>
          <img className={styles.bannerImage} src={Banner1} alt="banner 1" />
          <img className={styles.bannerImage} src={Banner2} alt="banner 1" />
        </Carousel>
      </div>
    </div>
  );
};
