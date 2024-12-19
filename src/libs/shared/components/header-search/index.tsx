
import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { Search } from "libs/shared/assets/svg";
import styles from "./header-search.module.scss";
import axios from "axios";
import {
  NameAndSpeciality,
  ComapnyAndUrl,
  EmailAndPhone,
} from "pages/feature-dso-corporate/components/table-row-component";

export const HeaderSeach = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };
  const onSearch = async (searchText: string) => {
    if (searchText.length>=3){
      
      setLoading(true);
      try {
        if (searchText) {
          const response = await axios.get(`${import.meta.env.VITE_BASE_HOST}/master/get-global-search`, {
            params: { key: searchText },
          });
          setOptions(response?.data?.data || []);
          setOpen(true)
        } else {
          setOptions([]);
          onSelect?.("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }else{
      setOpen(false)
      setOptions([]);
    }
  };
  
  return (
    <div className={styles.container} ref={containerRef}> 
      <input placeholder="Search dataset" onChange={(e) => { onSearch(e.target.value)}}/>
      <Search fill="#010101de" />
      {open && (
        <ul className={styles.dropdown_container}>
            {options.map((option) => {
              return (
                <li
                  className={styles.active_option}
                  key={option?.contact_id || option?.parent_dso_id}
                  // onClick={() => {
                  //   const origin = window.location.origin;
                  //   window.open(`${origin}/info?id=${option?.contact_id}&type=contact`, "_blank");
                  // }}
                  >
                    {
                    option?.data_type == 'parent' && option?.parent_dso_id ? (
                        <ComapnyAndUrl name={option?.parent_company_name} url='' id={option?.parent_dso_id} dsoAddress={option?.parent_address1}/>
                      ):
                      option?.data_type == 'subsidiary' && option?.subsidiary_id ? (
                        <ComapnyAndUrl name={option?.subsidiary_name} url='' id={option?.subsidiary_id} dsoAddress={option?.subsidiary_web_address} />
                      ):
                        option?.data_type == 'practice' && option?.practice_location_id ? (
                          <ComapnyAndUrl name={option?.practice_name} url='' id={option?.practice_location_id} dsoAddress={option?.practice_address1} />
                        ):
                          option?.data_type == 'contact' && option?.contact_id && (
                            <NameAndSpeciality
                              name={option?.contact_full_name}
                              position={option?.title}
                              linkedin={""}
                              flow={false}
                              id={option?.contact_id}
                            />
                          )
                    }
                  
                  {/* {option?.contact_full_name} */}

                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};


// import React, { useState } from 'react';
// import { AutoComplete, Input } from 'antd';
// import type { AutoCompleteProps } from 'antd';

// const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

// const searchResult = (query: string) =>
//   new Array(getRandomInt(5))
//     .join('.')
//     .split('.')
//     .map((_, idx) => {
//       const category = `${query}${idx}`;
//       return {
//         value: category,
//         label: (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <span>
//               Found {query} on{' '}
//               <a
//                 href={`https://s.taobao.com/search?q=${query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {category}
//               </a>
//             </span>
//             <span>{getRandomInt(200, 100)} results</span>
//           </div>
//         ),
//       };
//     });

// const App: React.FC = () => {
//   const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

//   const handleSearch = (value: string) => {
//     setOptions(value ? searchResult(value) : []);
//   };

//   const onSelect = (value: string) => {
//     console.log('onSelect', value);
//   };

//   return (
//     <AutoComplete
//       popupMatchSelectWidth={252}
//       style={{ width: 300 }}
//       options={options}
//       onSelect={onSelect}
//       onSearch={handleSearch}
//       size="large"
//     >
//       <Input.Search size="large" placeholder="input here" enterButton />
//     </AutoComplete>
//   );
// };

// export default App;