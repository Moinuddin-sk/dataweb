import { MultiSelect} from "libs/shared/core-ui";
import { useEffect, useRef, useState } from "react";
import styles from "./location-select.module.scss";
import { Dropdown } from "libs/shared/assets/svg";
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import { Select } from "../select";
import { USState, getStateAndCityPicklist } from "constants/drop-down-options";
export interface LocationSelectProps {
  filledValue?: string;
  region?: []
  value?: number | string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  zipcode?: string;
  onZipcodeChange?: (value: string) => void;
  countryValue?:string;
  stateValue?: string;
  cityValue?: string;
  onCountrySelect?: (value: string) => void;
  onStateSelect?: (value: string) => void;
  onCitySelect?: (value: string) => void;
  showCountry?: boolean;
}

export const LocationSelect = ({
  filledValue="",
  region=[],
  value = "",
  placeholder,
  onSelect,
  zipcode,
  onZipcodeChange,
  countryValue,
  stateValue,
  cityValue,
  onCountrySelect,
  onStateSelect,
  onCitySelect,
  showCountry=true,
}: LocationSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stateOption, setStateOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);
  const [tempState, setTempState] = useState("");
  const [tempStateChanges, setTempStateChanged] = useState({});

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
  const [radioValue, setRadioValue] = useState(0);
  useEffect(() => {
    console.log(tempStateChanges);
    const selectedState = USState.filter(s => s.value == tempStateChanges)
    console.log(selectedState);
    setTempState(() => selectedState.length>0 ? selectedState[0]?.label: "")
  }, [tempStateChanges]);



  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  const onCountryChange = (e:any) => {
    if(e === 'usa'){
      setStateOption(USState)
    }
    onCountrySelect(e);
  }
  const onStageChange = (e) => {
    console.log(e)
    const cities = getStateAndCityPicklist[0][e];
    setTempStateChanged(e);
    setCityOption(cities);
    onStateSelect(e);
  }
  
  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${open || filledValue? styles.active : ""}`}>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}>
        <section>{filledValue ? filledValue : placeholder}</section>
        <Dropdown />
      </div>
      {open && (
        <section className={styles.dropdown_container}>
          <Radio.Group onChange={onChange} value={radioValue}>
            <Space direction="vertical">
              {showCountry && (<>              
              <Radio value={1}>Select location</Radio>
              {radioValue == 1 && <div>
                <div className={styles.pad_bottom}>
                <Select
                  value={countryValue}
                  options={[
                    { label: "USA", value: 'usa' },
                    // { label: "Canada", value: 'canada' }
                  ]}
                  placeholder="Country"
                  onSelect={onCountryChange}
                />
                </div>
                <div className={styles.pad_bottom}>
                <Select
                  value={tempState}
                  options={stateOption}
                  placeholder="State"
                  onSelect={onStageChange}
                />
                </div>
                <div className={styles.pad_bottom}>
                <Select
                  value={cityValue}
                  options={cityOption}
                  placeholder="City"
                  onSelect={onCitySelect}
                />
                </div>
                
              </div>}
              </>
              )}
              <Radio value={2}>ZIP code radius</Radio>
              {radioValue == 2 && <div>
                <ul>
                  <li>
                    <div className={styles.pad_bottom}>
                    <input
                      onChange={(e) => {
                        onZipcodeChange?.(e.target.value);
                      }}
                      className={styles.search_input}
                      placeholder="ZIP"
                      value={zipcode}
                    />
                    </div>
                  </li>
                  <li>
                    <div className={styles.pad_bottom}>
                    <Select
                      value={value}
                      options={[
                        { label: "within 25 miles", value: 25 },
                        { label: "within 50 miles", value: 50 },
                        { label: "within 100 miles", value: 100 },
                        { label: "within 300 miles", value: 300 },
                      ]}
                      placeholder=""
                      onSelect={onSelect}
                    />
                    </div>
                  </li>
                </ul>
                <div>
                  
                </div>
              </div>}
              {/* <Radio value={3}>Option C</Radio>
              <Radio value={4}>
                More...
                {value === 4 ? <Input style={{ width: 100, marginInlineStart: 10 }} /> : null}
              </Radio> */}
            </Space>
          </Radio.Group>




          
        </section>
      )}
    </div>
  );
};
