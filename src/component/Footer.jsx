import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} WeddingWise. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

