import Card_services from './CardServices';
import styles from '../components/styles/cardsServices.module.css';
import urg from '../assets/img/img_cards/ambulancia.jpg'
import odo from '../assets/img/img_cards/odontologia.jpg'
import desc from '../assets/img/img_cards/farmacia.jpg'
import viaj from '../assets/img/img_cards/viajero.jpg'
import enf from '../assets/img/img_cards/enfermeria.jpg'
import vac from '../assets/img/img_cards/vacuna.jpg'
import fis from '../assets/img/img_cards/fisico.jpg'
import psi from '../assets/img/img_cards/psicologia.jpg'

const CardsServices = () => {
  const cardServices = [
    { id: 1, title: 'Urgencias', image: urg, hover: 'Asistencia las 24 Hs.' },
    { id: 2, title: 'Odontología', image: odo , hover: 'Tenemos guardias en Odontología'},
    { id: 3, title: 'Descuentos', image: desc , hover: 'Descuentos en Farmacias desde el 40%'},
    { id: 4, title: 'Viajeros', image: viaj , hover: 'Si te gusta viajar, nosotros te cuidamos'},
    { id: 5, title: 'Enfermería', image: enf , hover: 'Contamos con el servicio de enfermeria las 24 Hs.'},
    { id: 6, title: 'Antigripal', image: vac , hover: 'Vacuna Antigripal sin costo. *(Una vez por año)'},
    { id: 7, title: 'Examenes', image: fis , hover: 'Brindamos el servicio de Apto Físico Escolar'},
    { id: 8, title: 'Psicoterapia', image: psi , hover: 'Salud Mental, contamos con guardias 24 Hs.'},
  ];

  return (
    <div className={styles.cardsContainer}>
    {cardServices.map((card) => (
      <div key={card.id} className={styles.card}>
        <Card_services title={card.title} imageUrl={card.image} hoverText={card.hover} />
      </div>
    ))}
  </div>
  );
}

export default CardsServices;