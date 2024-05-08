import { useState } from 'react';
import Info_company from '../components/Info_company';
import Info_people from '../components/Info_people';
import styles from '../components/styles/contact.module.css'

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState('personas');

  return (
    <section className={styles.contact_section}>
      <div className={styles.background}>
        <div className={styles.container}>
          <h2>Nuestros contactos</h2>
          <h4>¡Nuestros canales de comunicación a tu disposición!</h4>
          <div className={styles.options}>
            <button className={selectedOption === 'personas' ? styles.selected_option : styles.option} onClick={() => setSelectedOption('personas')}>
              Personas
            </button>
            <button className={selectedOption === 'empresas' ? styles.selected_option : styles.option} onClick={() => setSelectedOption('empresas')}>
              Empresas
            </button>
          </div>
        </div>
      </div>
      {selectedOption === 'personas' && (
        <Info_people />
      )}
      {selectedOption === 'empresas' && (
        <Info_company />
      )}
    </section>
  );
}

export default Contact;

