import { HeaderSeach } from "../header-search";
import styles from "./header.module.scss";
import Logo from "libs/shared/assets/logo.png";

export const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <img src={Logo} className={styles.logo} />
      </div>
      <section>
        <HeaderSeach />
      </section>
    </header>
  );
};
