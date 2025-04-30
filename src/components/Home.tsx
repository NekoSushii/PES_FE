import { useState } from "react";
import styles from "../styles/Home.module.css";
import Map from "./Map";

const Home: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(o => !o);

  return (
    <div className={styles.home}>
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
      >
        <nav className={styles.menu}>
          <a href="login">Login</a>
          <a href="feedback">Feedback</a>
        </nav>
      </aside>

      {drawerOpen && (
        <div className={styles.overlay} onClick={toggleDrawer} />
      )}

      <main className={styles.main}>
        <header className={styles.header}>
          <button
            aria-label="Toggle menu"
            className={styles.hamburger}
            onClick={toggleDrawer}
          >
            <span />
            <span />
            <span />
          </button>

          <h3 className={styles.title}>Property Neighbour</h3>
        </header>

        <div className={styles.map}>
          <Map />
        </div>
      </main>
    </div>
  );
};

export default Home;
