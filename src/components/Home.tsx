import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Map from "./Map";

const Home: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(o => !o);

  useEffect(() => {
    setPopupOpen(true);
  }, []);

  return (
    <div className={styles.home}>
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
      >
        <nav className={styles.menu}>
          {/* <Link to="login">Login</Link> */}
          <Link to="feedback">Feedback</Link>
        </nav>
      </aside>

      {drawerOpen && (
        <div className={styles.overlay} onClick={toggleDrawer} />
      )}

      {popupOpen && (
        <>
          <div
            className={styles.popupBackdrop}
            onClick={() => setPopupOpen(false)}
          />

          <div className={styles.popup} role="dialog" aria-modal="true">
            <button
              aria-label="Close popup"
              className={styles.popupClose}
              onClick={() => setPopupOpen(false)}
            >
              &times;
            </button>

            <h4 className={styles.popupHeading}>Welcome</h4>
            <p className={styles.popupText}>This is an open source project that is still in development, and the only areas which are available for contribution are Hougang, Rochor and Museum.</p>
            <p className={styles.popupText}>Do note that these are not postal districts but planning districts.</p>
            <p className={styles.popupText}>Have fun!</p>
          </div>
        </>
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
