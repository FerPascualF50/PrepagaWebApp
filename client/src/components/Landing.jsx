import styles from '../components/styles/landing.module.css'
import homeImg from '../assets/img/home_img.jpg'


const Landing = () => {
  return (
    <div className={styles.landing_page}>
      <header>
        <div className={styles.container_h1}>
          <div >
            <img src={homeImg} alt="img not found" />
          </div>
          <div className={styles.container_up}>
            <h1>Vita </h1>
            <h1 className={styles.plus}>+</h1>
          </div>
        </div>
        <p>Te damos la bienvenida a Vita Plus... encontrá el plan a tu medida</p>
            <a className={styles.info_button} href="/plans" > Vita + Planes</a>
      </header>
      <section>
        <h2>Por qué elegirnos</h2>
        <p>mostrar info de los  beneficios y valores de la obra social.</p>
      </section>
    </div>
  );
};

export default Landing;