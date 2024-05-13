import styles from './styles/card.module.css';

const Card = ({ center }) => {
  return (
    <div className={styles.card}>
      <div className={styles.background}>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>Vita</h2>
          <span className={styles.plus_sign}>+</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{center.name}</h2>
        <h3 className={styles.subtitle}>{center.address}</h3>
        <h3 className={styles.subtitle}>{center.time}</h3>
      </div>
    </div>
  );
}

export default Card