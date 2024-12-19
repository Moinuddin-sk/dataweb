import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { HeaderContainer } from "./component/header-container";
import styles from "./feature-org-details.module.scss";
import { Insights } from "./component/insights";
import { useLocation } from "react-router-dom";


export interface SubsidiaryData{
  overview:{
    subsidiary_main_email_address: string;
    subsidiary_size: string;
    subsidiary_year_founded: string;
    technology: string;
    subsidiary_name: string;
    subsidiary_web_address: string;
    parent_dso_id: string;
    subsidiary_id: string;
  },
  parent_info: ParentInfo;
  practice_locations: PracticeLocation[];
  contacts: Contact[]
}

export interface ParentInfo {
  id: number;
  parent_company_name: string;
  parent_web_address: string;
  last_updated_date: string;
  intent_keyword: string;
  private_equity_firm: string;
  parent_company_logo: string;
  parent_company_overview: string;
  technology: string;
  parent_company_linkedin_url: string;
  parent_phone_number: string;
  parent_fax_number: string;
  parent_address1: string;
  parent_address2: string;
  parent_city: string;
  parent_state: string;
  parent_county: string;
  parent_zipcode: string;
  parent_year_founded: string;
  parent_employees: string;
  parent_revenue_actual: string;
  parent_revenue_range: string;
  parent_dso_id: string;
  hq_location: string;
  parent_country: string;
}

export interface PracticeLocation {
  practice_name: string;
  practice_address1: string;
  practice_location_id: string;
  practice_phone_number: string;
  practice_web_address: string;
  practices_locations_number: string;
  practices_locations_range: string;
  practicing_states: string;
  practice_ownership_type: string;
  practice_address2: string;
  practice_city: string;
  practice_state: string;
  practice_county: string;
  practice_country: string;
  practice_zipcode: string;
  practice_fax_number: string;
  practice_employees: string;
  practice_revenue_actual: string;
  practice_revenue_range: string;
  practice_number_of_doctors: string;
  practice_year_founded: string;
  practice_latitude: string;
  practice_longitude: string;
}
export interface Contact {
  id: number;
  department: string;
  contact_full_name: string;
  contact_linkedin_url: string;
  email_address: string;
  contact_id: string;
  contact_first_name: string;
  contact_last_name: string;
  direct_dial: string;
  dentist_type: string;
  dental_degree: string;
  dentist_procedure_score: string;
  title: string;
}
// export interface OrgData {
//   title: string;
//   id: number;
//   gender: string;
//   department: string;
//   subsidiary_name: string;
//   subsidiary_web_address: string;
//   parent_web_address: string;
//   contact_full_name: string;
//   contact_linkedin_url: string;
//   parent_company_name: string;
//   practice_name: string;
//   practice_address1: string;
//   email_address: string;
//   practice_phone_number: string;
//   last_updated_date: string;
//   parent_dso_id: number | null;
//   subsidiary_id: number | null;
//   contact_first_name: string;
//   contact_last_name: string;
//   title_level: string;
//   direct_dial: string;
//   npi_number: string;
//   experience_of_dentist: string;
//   dentist_type: string;
//   dental_degree: string;
//   state_license_code1: string;
//   state_license_code2: string;
//   state_license_code3: string;
//   state_license_code4: string;
//   state_license_code5: string;
//   state_license_number1: string;
//   state_license_number2: string;
//   state_license_number3: string;
//   state_license_number4: string;
//   state_license_number5: string;
//   procedure_code: string;
//   dentist_procedure_score: string;
//   intent_keyword: string;
//   practice_web_address: string;
//   practices_locations_number: string;
//   practices_locations_range: string;
//   practicing_states: string;
//   practice_ownership_type: string;
//   practice_address2: string;
//   practice_city: string;
//   practice_state: string;
//   practice_county: string;
//   practice_country: string;
//   practice_zipcode: string;
//   practice_fax_number: string;
//   practice_employees: string;
//   practice_revenue_actual: string;
//   practice_revenue_range: string;
//   practice_number_of_doctors: string;
//   practice_year_founded: string;
//   practice_latitude: string;
//   practice_longitude: string;
//   subsidiary_main_email_address: string;
//   subsidiary_size: string;
//   private_equity_firm: string;
//   subsidiary_year_founded: string;
//   parent_company_logo: string;
//   parent_company_overview: string;
//   technology: string;
//   parent_company_linkedin_url: string;
//   parent_phone_number: string;
//   parent_fax_number: string;
//   parent_address1: string;
//   parent_address2: string;
//   parent_city: string;
//   parent_state: string;
//   parent_county: string;
//   parent_zipcode: string;
//   parent_year_founded: string;
//   parent_employees: string;
//   parent_revenue_actual: string;
//   parent_revenue_range: string;
//   hq_location: string;
//   location_type: string;
//   parent_country: string;
//   practice_location_id: number | null;
//   contact_id: number | null;
//   file_type_module: string;
//   file_type_dso_corporate: string;
//   file_type_dso_dentists: string;
//   file_type_org_chart: string;
//   file_type_unique_dso: string;
//   file_type_top300_dsos: string;
//   file_type_2location_practices: string;
//   file_type_all_dentists: string;
//   file_type_independent_dentists: string;
//   file_type_dental_labs: string;
//   file_type_reverse_pe_lookup: string;
// }

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const FeatureSubsidiaryDetails = () => {
  const query = useQuery();
  const subsidiary_id = query.get("subsidiary_id");
  const [data, setData] = useState<SubsidiaryData | null>(null);
  const fetchData = useCallback(async () => {
    try {
      const response: { data: { data: SubsidiaryData } } = await axios.get(
        `${
          import.meta.env.VITE_BASE_HOST
        }/dso/org-chart/get-subsidiary-company-details?subsidiary_id=${subsidiary_id}`
      );
      setData(response?.data?.data || null);
    } catch (error) {
      console.log(error);
    }
  }, [subsidiary_id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className={styles.container}>
      <HeaderContainer data={data} />
      <div>
        <Insights data={data} />
      </div>
    </div>
  );
};
