import { Female, Male, Transgender } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddEntryModal from '../../AddEntryModal';
import { apiBaseUrl } from '../../constants';
import { updatePatient, useStateValue } from '../../state';
import { EntryFormValues, Gender, Patient } from '../../types';

import EntryDetail from './EntryDetail';

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
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setError(undefined);
    setModalOpen(false);
  };

  useEffect(() => {
    if (patientId) {
      const fetchPatientById = async () => {
        try {
          const { data: fetchedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patientId}`
          );
          dispatch(updatePatient(fetchedPatient));
        } catch (e) {
          console.error(e);
        }
      };

      void fetchPatientById();
    }
  }, [patientId]);

  const submitEntry = async (values: EntryFormValues) => {
    if (patientId) {
      try {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        dispatch(updatePatient(updatedPatient));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    }
  };

  if (!patientId) {
    return null;
  }

  return patients[patientId] ? (
    <>
      <h2>
        {patients[patientId].name} {iconByGender(patients[patientId].gender)}
      </h2>
      <section>
        <p>ssn: {patients[patientId].ssn}</p>
        <p>occupation: {patients[patientId].occupation}</p>
        <h3>entries</h3>
        <section>
          {patients[patientId].entries.map((entry) => (
            <EntryDetail key={entry.id} entry={entry} />
          ))}
        </section>
      </section>
      <AddEntryModal
        onSubmit={submitEntry}
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
      />
      <Button variant='contained' type='button' onClick={openModal}>
        Add New Entry
      </Button>
    </>
  ) : null;
};

export default PatientPage;
