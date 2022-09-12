import { Action, Diagnosis, Patient, State } from '../types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // patient actions
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    // diagnosis actions
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({
              ...memo,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case 'ADD_DIAGNOSIS':
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          [action.payload.code]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload,
});

export const addPatient = (payload: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload,
});

export const updatePatient = (payload: Patient): Action => ({
  type: 'UPDATE_PATIENT',
  payload,
});

export const setDiagnosisList = (payload: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSIS_LIST',
  payload,
});

export const addDiagnosis = (payload: Diagnosis): Action => ({
  type: 'ADD_DIAGNOSIS',
  payload,
});
