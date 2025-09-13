import styles from "./Footer.module.css";
import { FaBootstrap, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} TUMO TODO. All rights reserved.</p>
      <div className={styles.footerIcons}>
        <a href="https://www.facebook.com/tumocenter?mibextid=ZbWKwL" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/tumocenter?igsh=emcxd3BnNXJnMGFp" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
