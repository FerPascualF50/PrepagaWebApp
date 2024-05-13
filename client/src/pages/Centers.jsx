import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/CardCenter";
import { getAllCenters, setSelectedProvince } from '../store/centerSlice';
import { Box, Grid, Select, MenuItem, OutlinedInput } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import styles from '../components/styles/faq.module.css'
import Loading from '../components/Loading';
import theme from '../theme';

const Centers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(getAllCenters()).unwrap().finally(() => setLoading(false))
  }, [dispatch]);

  const { centers, provinces, selectedProvince } = useSelector((state) => state.center);

  const handleChangeProvince = (event) => {
    dispatch(setSelectedProvince(event.target.value));
  };

  const filteredCenters = selectedProvince ? centers.filter(center => center.province.id === selectedProvince) : centers;
  const sortedProvinces = provinces.slice().sort((a, b) => a.name.localeCompare(b.name));


  return (
    <ThemeProvider theme={theme}>
      {loading && (<Loading />)}
      <div className={styles.faq_section}>
        <div className={styles.background} style={{ backgroundColor: '#45d1b7' }}>
          <div className={styles.container}>
            <h2>Nuestros centros de atención</h2>
            <h4 style={{ paddingBottom: '10px' }}>¡Elegi tu provincia !</h4>
            <Select value={selectedProvince} onChange={handleChangeProvince} displayEmpty fullWidth MenuProps={{ PaperProps: { style: { maxHeight: 300 }, }, }} input={<OutlinedInput style={{ border: '3px solid #FFF' }} />}>
              <MenuItem value="" disabled > Seleccione una provincia </MenuItem>
              {sortedProvinces.map((province) => (
                <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Box sx={{ width: '90%', marginLeft: '5%', display: 'flex', marginBottom: '20px', padding: '50px', backgroundColor: 'white', transform: 'translateY(-70px)', borderRadius: '5px' }}>
        <Grid container spacing={2}>
          {filteredCenters.map((center) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={center.id}>
              <Card center={center} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Centers