import styles from '../components/styles/contact.module.css'

const Info_people = () => {
  return (
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
  )
}

export default Info_people