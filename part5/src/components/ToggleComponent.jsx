import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const ToggleComponent = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  useImperativeHandle(refs, () => (
    { toggleVisibility }
  ));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type='button' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

ToggleComponent.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ToggleComponent;
