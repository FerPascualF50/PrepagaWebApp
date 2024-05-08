import CardsServices from './Cards_services';
import styles from '../components/styles/landing.module.css'
import homeImg from '../assets/img/home_img.jpg'
import { Skeleton } from '@mui/material';

const Landing = () => {
  return (
    <div className={styles.landing_page}>
      <div className={styles.container_h1}>
        <div >
          {homeImg ? ( <img src={homeImg} alt="img not found" /> ) : ( <Skeleton variant="rectangular" animation="wave" width={1980} height={500} /> )}
        </div>
        <div className={styles.container_up}>
          <h1>Vita </h1>
          <h1 className={styles.plus}>+</h1>
        </div>
      </div>
      <p>Te damos la bienvenida a Vita Plus... encontrá el plan a tu medida</p>
      <a className={styles.info_button} href="/plans" > Vita + Planes</a>
      <div className={styles.div_h2}>
        <h2>Algunos Servicios...</h2>
      </div>
      <section>
        <CardsServices />
      </section>
    </div>
  );
};

export default Landing;