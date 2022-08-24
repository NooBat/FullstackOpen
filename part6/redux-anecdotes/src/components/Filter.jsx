import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeFilter, resetFilter } from '../reducers/filterReducer';

const filterSelector = (state) => state.filter;

const Filter = () => {
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(changeFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input type='text' onChange={handleChange} value={filter} />
      <button type='button' onClick={() => dispatch(resetFilter())}>
        reset
      </button>
    </div>
  );
};

export default Filter;
