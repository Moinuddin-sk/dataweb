// export const treviewSampleData: CompanyData = {
//   data: [
//   ],
//   pagination: {
//     currentPage: 0,
//     totalItems: 101,
//     totalPages: 21,
//   },
// };

export interface CompanyData {
  data: Company[];
  pagination: Pagination;
}

export interface Company {
  company: {
    name: string;
    location_type: string;
    location: string;
    parent_dso_id: string;
    subsidiaries: Subsidiary[];
    practice_locations: PracticeLocation[];
  };
}

export interface Subsidiary {
  name: string;
  subsidiary_id: string;
  subsidiary_web_address: string;
  practice_locations: PracticeLocation[];
}

export interface PracticeLocation {
  practice_name: string;
  practice_address1: string;
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
  practice_location_id: string;
  practice_phone_number: string;
}

export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
