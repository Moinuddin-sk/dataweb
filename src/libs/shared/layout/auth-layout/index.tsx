import { Outlet } from "react-router-dom";
import { Header } from "libs/shared/components/header";
import { Sidebar } from "libs/shared/components/sidebar";
import styles from "./auth-layout.module.scss";

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main_container}>
        <Header />
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};
