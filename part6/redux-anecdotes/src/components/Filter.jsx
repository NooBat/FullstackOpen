/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';

import { changeFilter, resetFilter } from '../reducers/filterReducer';

const Filter = ({ filter, changeFilter, resetFilter }) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    changeFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input type='text' onChange={handleChange} value={filter} />
      <button type='button' onClick={() => resetFilter()}>
        reset
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  changeFilter,
  resetFilter,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
