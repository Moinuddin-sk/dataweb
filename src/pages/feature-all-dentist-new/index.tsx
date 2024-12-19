import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { HeaderContainer } from "./component/header-container";
import styles from "./feature-org-details.module.scss";
import { Insights } from "./component/insights";
import { useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface DentistData {
  data: DentistDataProps;
}
export interface DentistDataProps {
  //   Contact_Full_Name
  //   Contact_LinkedIn_URL
  //   Contact_First_Name
  //   Contact_Last_Name
  //   Email_Address
  // Title / Specialty
  // Title_Level
  // Department / Specialty_Group
  // Gender
  // Direct_Dial
  overview: {
    npi_number: string;
    contact_full_name: string;
    contact_first_name: string;
    contact_last_name: string;
    contact_linkedin_url: string;
    email_address: string;
    gender: string;
    title_level: string;
    title: string;
    direct_dial: string;
    experience_of_dentist: string;
    dentist_type: string;
    dental_degree: string;
    department: string;
    last_updated_date: string;
  };
  practiceInfo: {
    practice_phone_number: string;
    practice_name: string;
    practice_web_address: string;
    practice_ownership_type: string;
    practice_state: string;
    practice_country: string;
    practice_city: string;
    practice_revenue_actual: string;
    practice_number_of_doctors: string;
    practicing_states: string;
    practice_zipcode: string;
    practice_address1: string;
    practices_locations_number: string;
    practice_county: string;
    practice_year_founded: string;
    practice_address2: string;
    practice_revenue_range: string;
    practices_locations_range: string;
    practice_fax_number: string;
    practice_employees: string;
  };
  dsoInfo: {
    dso_name: string;
    dso_year_founded: string;
    dso_main_email_address: string;
    private_equity_firm: string;
    dso_size: string;
    dso_web_address: string;
  };
  parentCompanyInfo: {
    parent_company_logo: string;
    parent_company_name: string;
    hq_location: string;
    parent_web_address: string;
    parent_phone_number: string;
    parent_fax_number: string;
    parent_company_linkedIn_url: string;

    parent_employees: string;
    parent_address1: string;
    parent_address2: string;
    technology: string;
    parent_revenue_range: string;
    parent_revenue_actual: string;
    // location_type: string;
    parent_state: string;
    parent_year_founded: string;
    parent_company_overview: string;
    parent_city: string;
    parent_county: string;
    parent_country: string;
    parent_zipcode: string;
  };
  stateLicenceCode: {
    state_license_code1: string;
    state_license_code2: string;
    state_license_code3: string;
    state_license_code4: string;
    state_license_code5: string;
    state_license_number1: string;
    state_license_number2: string;
    state_license_number3: string;
    state_license_number4: string;
    state_license_number5: string;
  };
  intent: {
    intent_keyword: string;
  };
  procedureCode: {
    procedure_code: string;
    dentist_procedure_score: string;
  };
  locationInfo: {
    practice_latitude: string;
    practice_longitude: string;
  };
  labInfo: {
    company_name_lab: string;
    company_linkedin_url_lab: string;
    web_address_lab: string;
    address1_lab: string;
    address2_lab: string;
    city_lab: string;
    state_lab: string;
    county_lab: string;
    zipcode_lab: string;
    country_lab: string;
    phone_number_lab: string;
    fax_number_lab: string;
    direct_dial_lab: string;
    employees_lab: string;
    revenue_lab: string;
  }
}

export const FeatureAllDentistInfosNew = () => {
  const query = useQuery();
  const id = query.get("id");
  const data_type = query.get("type")
  const [data, setData] = useState<DentistData | null>(null);
  const fetchData = useCallback(async () => {
    if (id) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_HOST}/dso/profile/dentist?profileId=${id}`
        );
        setData(response?.data?.[0].data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className={styles.container}>
      <HeaderContainer data={data} />
      <div>
        <Insights data={data} profile_id={id || ""} data_type={data_type}/>
      </div>
    </div>
  );
};
