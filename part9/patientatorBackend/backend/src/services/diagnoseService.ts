import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => diagnoses;

export default { getEntries };
