import { Accordion, AccordionSummary, AccordionDetails, Grid, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import styles from '../components/styles/faq.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../store/planSlice';
import { patchPlanOnUser } from '../store/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPlans());
  }, []);

  const { plans } = useSelector(state => state.plan);

  const handleContratar = async (planId) => {
    const response = await dispatch(patchPlanOnUser(planId))
    if (!response.payload.success) return toast.error('No has podido contratar el plan')
      setTimeout(() => {
        toast.success(`Has contratado tu Plan con éxito.\nGracias ${response.payload.response.firstName} ${response.payload.response.lastName}\npor confiar en Vta +.`, {
          position: "top-center", duration: 3000
        });
      }, 50),
    navigate('/dashboard-user/manage', { replace: true })
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <div className={styles.faq_section}>
        <div className={styles.background} style={{ backgroundColor: '#45d1b7' }}>
          <div className={styles.container}>
            <h2>Planes de Salud</h2>
            <h4>¡Contrata el que prefieras!</h4>
            <h4>¡MAYO 40% OFF! ¿Qué estás esperando?</h4>
          </div>
        </div>
      </div>
      <div className={styles.faq_info}>
        <Grid container alignItems="center" justifyContent="center" paddingBottom={10}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {plans?.map((plan, index) => (
              <Accordion key={plan._id} sx={{ '&.Mui-expanded': { border: `1px solid ${theme.palette.primary.main}` } }} >
                <AccordionSummary
                  sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                  expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <div style={{ marginRight: 'auto' }}>{plan.name}</div>
                  <div style={{ marginRight: '4%' }}>{`$ ${plan.price},00`}</div>
                </AccordionSummary>
                <AccordionDetails sx={{ margin: '12px', marginTop: '0px', width: '100%', color: 'grey', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard-user/profile')} sx={{ marginBottom: '16px' }}>CONTRATAR</Button>
                  <ul style={{ color: 'grey', width: '100%', fontWeight: 'bold' }}> Beneficios Principales:
                    {plan.mainBenefits.map((benefit, subIndex) => (
                      <li key={subIndex} style={{ fontWeight: 'lighter ' }}>{benefit}</li>
                    ))}
                  </ul>
                  {plan.otherBenefits.length > 0 &&
                    <ul style={{ color: 'grey', width: '100%', fontWeight: 'bold' }}> Otros Beneficios:
                      {plan.otherBenefits.map((benefit, subIndex) => (
                        <li key={subIndex} style={{ fontWeight: 'lighter ' }}>{benefit}</li>
                      ))}
                    </ul>}
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Plans;