import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Map from "./Map";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.main}>
        <h1>Property Estates Of Singapore</h1>
        <p>Lets take a walk through the neighbourhood</p>
        <Map />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
