import { Link } from 'react-router-dom';
import './Landing.css';
import  homeImg  from '../assets/img/home_img.jpg'


const Landing = () => {
  return (
    <div className="landing-page">
      <header>
        <div className='container_h1'>
          <div >
            <img className='carousel-img' src={homeImg} alt="img not found" />
          </div>
          <div className='container_up'>
            <h1>Vita </h1>
            <h1 className='plus'> +</h1>
          </div>
        </div>
        <p>Te damos la bienvenida a Vita Plus... encontrá el plan a tu medida</p>
        <Link to='/plans'>
          <button className="masInfo_button"> Vita + Planes</button>
        </Link>
      </header>
      <section>
        <h2>Por qué elegirnos</h2>
        <p>mostrar info de los  beneficios y valores de la obra social.</p>
      </section>
      <footer>
        <p>Derechos de autor © 2024 Vita +</p>
      </footer>
    </div>
  );
};

export default Landing;