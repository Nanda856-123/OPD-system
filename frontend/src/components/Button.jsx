import React from 'react'
import styles from './Button.module.css';

const Button = ({ btnHandler, children, type = "button", disabled = false }) => {
  return (
    <button  type={type} onClick={btnHandler} className={styles.btn} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {children}
    </button>
  );
};

export default Button
