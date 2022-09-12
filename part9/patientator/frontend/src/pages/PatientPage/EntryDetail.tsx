import { Healing, MedicalServices, Work } from '@mui/icons-material';
import { Box } from '@mui/material';

import HealthRatingBar from '../../components/HealthRatingBar';
import { useStateValue } from '../../state';
import { Entry } from '../../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetail = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const defaultRender = (
    <>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const description = diagnoses[code]?.name;
            return description ? (
              <li key={code}>
                {code}: {description}
              </li>
            ) : (
              <li key={code}>{code}: diagnosis not exist</li>
            );
          })}
        </ul>
      ) : null}
    </>
  );

  const renderDetailsByType = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <>
            <p>
              <time dateTime={entry.date}>{entry.date}</time>{' '}
              <MedicalServices />
            </p>
            {defaultRender}
            <HealthRatingBar rating={entry.healthCheckRating} showText />
          </>
        );
      case 'Hospital':
        return (
          <>
            <p>
              <time dateTime={entry.date}>{entry.date}</time> <Healing />
            </p>
            {defaultRender}
            {entry.discharge ? (
              <>
                <i>discharge at</i>
                <p>
                  time:{' '}
                  <time dateTime={entry.discharge.date}>
                    {entry.discharge.date}
                  </time>
                </p>
                <p>criteria: {entry.discharge.criteria}</p>
              </>
            ) : null}
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <p>
              <time dateTime={entry.date}>{entry.date}</time> <Work />
              <i>{entry.employerName}</i>
            </p>
            {defaultRender}
            {entry.sickLeave ? (
              <>
                sick leave:
                <ul>
                  <li>
                    start at:{' '}
                    <time dateTime={entry.sickLeave.startDate}>
                      {entry.sickLeave.startDate}
                    </time>
                  </li>
                  <li>
                    end at:{' '}
                    <time dateTime={entry.sickLeave.endDate}>
                      {entry.sickLeave.endDate}
                    </time>
                  </li>
                </ul>
              </>
            ) : null}
          </>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <ul>
      <Box
        sx={{
          margin: '5px auto',
          border: '3px solid black',
          padding: '5px',
          borderRadius: '10px',
        }}
        key={entry.id}
      >
        {renderDetailsByType()}
      </Box>
    </ul>
  );
};

export default EntryDetail;
