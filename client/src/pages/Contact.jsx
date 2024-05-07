import { useState } from 'react';
import styles from '../components/styles/contact.module.css'

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState('personas');

  return (
    <section className={styles.contact_section}>
      <div className={styles.background} style={{ backgroundColor: '#45d1b7' }}>
        <div className={styles.container}>
          <h2>Nuestros contactos</h2>
          <h4>¡Todos nuestros canales de comunicación están a tu disposición!</h4>
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
        <div className={styles.contact_info}>
          <div className={styles.container}>
            <div className={styles.contact_box}>
              <h3>EMERGENCIAS/MÉDICO A DOMICILIO</h3>
              <p>0800 8 633486</p>
            </div>
            <div className={styles.contact_box}>
              <h3>ASOCIADOS / WhatsApp</h3>
              <p>+54 11 888 76846</p>
            </div>
            <div className={styles.contact_box}>
              <h3>QUIERO ASOCIARME</h3>
              <p>0800 2543 629</p>
            </div>
            <div className={styles.contact_box}>
              <h3>EMPRESAS</h3>
              <p>0800 3677 372</p>
            </div>
            <div className={styles.contact_box}>
              <h3>PRESTADORES</h3>
              <p>0800 3677 372</p>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'empresas' && (
        <div className={styles.contact_info}>
          <div className={styles.container}>
            <div className={styles.contact_box}>
              <h3>PROVEEDORES</h3>
              <p>0800 8888 346</p>
            </div>
            <div className={styles.contact_box}>
              <h3> WhatsApp</h3>
              <p>+54 11 4561 4687 </p>
            </div>
            <div className={styles.contact_box}>
              <h3>PAGOS</h3>
              <p>0800 888 0000</p>
            </div>
            <div className={styles.contact_box}>
              <h3>CONSULTAS</h3>
              <p>0800 4658 222</p>
            </div>
            <div className={styles.contact_box}>
              <h3>PRESTADORES</h3>
              <p>0800 8888 562</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;

