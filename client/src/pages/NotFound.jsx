import styles from '../components/styles/notFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.page_404}>
      <div className={styles.text_404}>
        <h1>404</h1>
        <a className={styles.back_button} href='/'>Volver</a>
      </div>
      <div>
        <div className={styles.four_zero_four_bg}>
        </div>
        <div className={styles.contant_box_404}>
          <h2>Ups....</h2>
          <h2>estas perdido....</h2>
          <h3>la página que buscas no esta por aqui !</h3>
        </div>
      </div>
    </div>
  )
}
export default NotFound
