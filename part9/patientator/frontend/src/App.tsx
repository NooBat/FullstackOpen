/* eslint-disable no-void */
import { Button, Container, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { apiBaseUrl } from './constants';
import PatientListPage from './pages/PatientListPage';
import PatientPage from './pages/PatientPage';
import { setDiagnosisList, setPatientList, useStateValue } from './state';
import { Diagnosis, Patient } from './types';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path='/' element={<PatientListPage />} />
            <Route path='/:patientId' element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
