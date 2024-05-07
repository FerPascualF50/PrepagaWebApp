import styles from './styles/card.module.css';


const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.background}>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>Vita</h2>
          <span className={styles.plus_sign}>+</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>Título de la Tarjeta</h2>
        <h3 className={styles.subtitle}>Subtítulo 1</h3>
        <h3 className={styles.subtitle}>Subtítulo 2</h3>
      </div>
    </div>
  );
}

export default Card