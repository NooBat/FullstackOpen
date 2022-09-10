import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../../constants';
import { Patient } from '../../types';

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
      <h3>{patient.name}</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>gender</p>
    </>
  ) : null;
};

export default PatientPage;
