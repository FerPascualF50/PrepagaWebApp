import styles from '../components/styles/contact.module.css'

 const Info_company = () => {
  return (
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
  )
}

export default Info_company
