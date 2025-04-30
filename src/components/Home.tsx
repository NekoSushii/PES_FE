import React from "react";
import styles from "../styles/Home.module.css";
import Map from "./Map";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h2 className={styles.title}>Property Neighbour</h2>
        <div className={styles.map}>
          <Map />
        </div>
      </main>
    </div>
  );
};

export default Home;
