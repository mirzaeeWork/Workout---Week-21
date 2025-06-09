import Search from "./Search";
import styles from "./Header.module.css";
import ThemeToggle from "./Theme/ThemeToggle";
import { TbLogin } from "react-icons/tb";
import Link from "next/link";

function Header({ user }) {
  return (
    <>
      <header>
        <ThemeToggle />
        <div className={styles.header}>
          <Search />
          <div className={styles.login}>
            {user ? (
              <span className={styles.link_Login}>{user}</span>
            ) : (
              <Link href="/login" className={styles.link_Login}>
                <TbLogin />
                <span>ورود</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

