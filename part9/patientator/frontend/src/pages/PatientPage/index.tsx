import { Female, Male, Transgender } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../../constants';
import { Gender, Patient } from '../../types';

const iconByGender = (gender: Gender) => {
  if (gender === 'male') {
    return <Male />;
  } else if (gender === 'female') {
    return <Female />;
  }

  return <Transgender />;
};

const PatientPage = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        setPatient(fetchedPatient);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientById();
  }, [patientId]);

  return patient ? (
    <>
      <h3>
        {patient.name} {iconByGender(patient.gender)}
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  ) : null;
};

export default PatientPage;
