import { useRouter } from "next/dist/client/router";
import styles from "./TopBar.module.scss";

export const TopBar = () => {
    const router = useRouter();

    const logOutOnClick = () => {
        localStorage.removeItem("token");
        router.push("/sign-in");
    };

    return (
        <div className={styles.topBar}>
            <h1 className={styles.topBar__logo} onClick={() => router.push("/dashboard")}>Acquire</h1>
            <div className={styles.topBar__navLinks}>
                <h2 className={styles.topBar__navLinks__link} onClick={() => router.push("/dashboard")}>Dashboard</h2>
                <h2 className={styles.topBar__navLinks__link} onClick={() => router.push("/market-search")}>Market</h2>
            </div>
            
            <h4 className={styles.topBar__logOut} onClick={logOutOnClick}>Sign Out</h4>
        </div>
    );
}
