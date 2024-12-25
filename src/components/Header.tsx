import React from 'react';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Property Neighbour</div>
      <nav>
        <a href="/login" className={styles.loginButton}>
          Login
        </a>
      </nav>
    </header>
  );
};

export default Header;
