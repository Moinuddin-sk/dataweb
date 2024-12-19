import { Home, ManageSearch } from "libs/shared/assets/svg";
import styles from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const nav = [
    { label: "Home", Icon: Home, nav: "/app" },
    { label: "Search", Icon: ManageSearch, nav: "/search" },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <ul>
          {nav.map((nav) => {
            return (
              <li
                key={nav.label}
                className={pathname === nav?.nav ? styles.active : styles.normal}
                onClick={() => {
                  if (nav.nav) navigate(nav.nav);
                }}>
                <div>
                  <nav.Icon fill={pathname === nav?.nav ? "#ffffff" : "#010101de"}/>
                </div>
                <span> {nav.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
