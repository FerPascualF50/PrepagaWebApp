import styles from '../components/styles/cardServices.module.css'
import { useState } from 'react';

const Card_services = ({ title, imageUrl, hoverText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (isHovered) => {
    setIsHovered(isHovered);
  };

  return (
    <div className={styles.card} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <img src={imageUrl} alt="Service" className={styles.image} />
      <h4 className={styles.title}>{title}</h4>
      {isHovered && <p className={styles.hoverText}>{hoverText}</p>}
    </div>
  );
}

export default Card_services;