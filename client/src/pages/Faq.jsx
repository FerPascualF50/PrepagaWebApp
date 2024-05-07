import { Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import styles from '../components/styles/faq.module.css'

const Faq = () => {
  const faqs = [
    {
      title: 'Quiero ser asociado a Vita +', subFaq: [
        { titleSubFaq: '¿Por qué mi prepaga tiene que ser Vita?', answer: 'Porque brindamos una amplia gama de planes, para asociados autónomos, en relación de dependencia y monotributistas. Además, incluímos dentro de nuestras propuestas: servicio de turismo, ayuda económica, subsidios para contingencias quirúrgicas y por fallecimiento y sepelio.' },
        { titleSubFaq: '¿Cómo hago para asociarme?', answer: 'Al momento de contar con nuestra cobertura, te llegará una credencial que te habilitará como Asociado y te permitirá el acceso a los distintos servicios. Además, podes también generar tu credencial virtual desde esta página web, para acceder a los servicios cuando los necesites de manera inmediata' }
      ]
    },
    {
      title: 'Acceso al servicio', subFaq: [
        { titleSubFaq: '¿Cuándo puedo utilizar los servicios?', answer: 'Al momento de contar con nuestra cobertura, te llegará una credencial que te habilitará como Asociado y te permitirá el acceso a los distintos servicios. Además, podes también generar tu credencial virtual desde esta página web, desde la sección Asociados.' },
        { titleSubFaq: '¿Cómo accedo a la atención?', answer: 'Para recibir la atención se deberá cumplir con las siguientes condiciones: A- Presentar el DNI y la credencial que te acredita como asociado. B- Concurrir a los prestadores que integran la cartilla de acuerdo al plan contratado. C- Tener la cuota abonada al día.' },
      ]
    },
    {
      title: 'Autogestiones', subFaq: [
        { titleSubFaq: '¿Puedo realizar trámites on line?', answer: 'Si, es muy simple, podés realizar diversas gestiones sin moverte de tu casa y obtener respuesta en forma inmediata. Ingresa a "Mi Cuenta"  y Registrate.' },
        { titleSubFaq: '¿Qué trámites puedo realizar de forma on line?', answer: '- Actualización de datos personales - Gestionar reintegros, autorizaciones, ingreso a programas especiales, cambio de forma de pago, solicitud de credenciales y visualización de facturas.' },
        { titleSubFaq: '¿Cómo genero mi usuario y contraseña para acceder al sitio de Autogestión de Asociados?', answer: '1- Accede al Boton Mi Cuenta y una vez en la página del login, tenes un boton en la parte inferior donde dice hace click si no tenes tu centta, luego  proporcionas tus datos, y eso es todo.' },
      ]
    },
    {
      title: 'Pago de la Factura', subFaq: [
        { titleSubFaq: '¿Cuáles son las formas de pago?', answer: '• PAGO POR DÉBITO: llamanos a los numeros de la sección CONTACTOS y adherite. También podrás adherirte de forma telefónica, a través del 0810-555-8275 • PAGO WEB. Ingresando en la opción Mi cuenta > Facturas > podes abonar con tarjeta de crédito, tarjeta de débito o Mercado Pago. Debés completar todos los datos solicitados y hacer clic en Pagar Factura. • PAGO ELECTRÓNICO: a través de Red Link (Pagar) y Banelco (Pago mis Cuentas). Ingresá a la aplicación móvil de Link o Banelco o ingresá a Pagos Mis Cuentas. Seleccioná la opción Pagar y elegí el rubro del servicio o la empresa. Colocá el código que está al pie de la factura, seleccioná la cuenta desde donde se realizará el débito o elegí el medio de pago. • PAGO FÁCIL  RAPIPAGO  COBRO EXPRESS  PROVINCIA NET  PRONTO PAGO  SANTA FE SERVICIOS  BANCOR  BICA: con factura o DNI del Asociado titular de la cuenta, según corresponda.' },
        { titleSubFaq: '¿Puedo adherirme a facturación electrónica?', answer: 'Sí, es muy fácil a través de la sección CONTACTOS, llamanos y lo hacmeos con vos.' },
      ]
    },
    {
      title: 'Autorizaciones', subFaq: [
        { titleSubFaq: '¿Qué requisitos debe cumplimentar un pedido médico?', answer: 'Tu pedido médico debe contener la siguiente información, legible y sin enmiendas ni tachaduras. Recordá que, si faltan datos, no se podrá dar curso a la autorización correspondiente. • Fecha de prescripción • Nombre y apellido • Número de asociado y plan • Diagnóstico claro • Práctica asistencial a realizar, o medicamentos solicitados (nombres genéricos) • Cantidad de prácticas, sesiones, medicamentos, etc. Si es internación, cantidad de días • Firma y sello del profesional prescriptor (con número de matrícula) Los datos deberán ser legibles, sin enmiendas ni tachaduras. Si tu pedido médico es para una práctica, tiene una validez de 60 días desde la fecha de prescripción. Si es para medicamentos, 30 días.' },
        { titleSubFaq: '¿Cómo solicito una autorización?', answer: 'Ens nuestro sitio web ingresando a Autorizaciones . Ahí adjuntá el pedido médico a través de un escaneo o foto legible.' },
      ]
    },
  ]
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.faq_section}>
        <div className={styles.background} style={{ backgroundColor: '#45d1b7' }}>
          <div className={styles.container}>
            <h2>Preguntas Frecuentes</h2>
            <h4>¡Todas tus consultas las podes ver desplegando los titulos!</h4>
          </div>
        </div>
      </div>
      <div className={styles.faq_info}>
        <Grid container alignItems="center" justifyContent="center" paddingBottom={10}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ '&.Mui-expanded': { border: `1px solid ${theme.palette.primary.main}` } }} >
                <AccordionSummary
                  sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}
                  expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}>
                  {faq.title}
                </AccordionSummary>
                <AccordionDetails>
                  {faq.subFaq.map((subFaq, subIndex) => (
                    <Accordion key={subIndex} sx={{ '&.Mui-expanded': { border: `1px solid ${theme.palette.primary.main}` } }} >
                      <AccordionSummary
                        sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.secondary.main }} />}
                        aria-controls={`panel${index + 1}-${subIndex + 1}-content`}
                        id={`panel${index + 1}-${subIndex + 1}-header`}>
                        {subFaq.titleSubFaq}
                      </AccordionSummary>
                      <AccordionDetails sx={{ color: '#807878' }}> {subFaq.answer} </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Faq;