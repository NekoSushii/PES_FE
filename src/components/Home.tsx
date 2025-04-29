import React from "react";
import styles from "../styles/Home.module.css";
import Map from "./Map";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h1>Property Estates Of Singapore</h1>
        <p>Lets take a walk through the neighbourhood</p>
        <Map />
      </main>
    </div>
  );
};

export default Home;
