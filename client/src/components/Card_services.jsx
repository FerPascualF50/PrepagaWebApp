import styles from '../components/styles/card_services.module.css'
import { useState } from 'react';

const Card_services = ({ title, imageUrl , hoverText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={imageUrl} alt="Service" className={styles.image} />
      <h4 className={styles.title}>{title}</h4>
      {isHovered && <p className={styles.hoverText}>{hoverText}</p>}
    </div>
  );
}

export default Card_services