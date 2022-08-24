import React from 'react';
import { useDispatch } from 'react-redux';

import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor='all'>
        <input id='all' name='filter' type='radio' onClick={() => dispatch(filterChange('ALL'))} />
        All
      </label>
      <label htmlFor='important'>
        <input
          id='important'
          name='filter'
          type='radio'
          onClick={() => dispatch(filterChange('IMPORTANT'))}
        />
        Importnant
      </label>
      <label htmlFor='nonimportant'>
        <input
          id='nonimportant'
          name='filter'
          type='radio'
          onClick={() => dispatch(filterChange('NONIMPORTANT'))}
        />
        Not Important
      </label>
    </div>
  );
};

export default VisibilityFilter;
