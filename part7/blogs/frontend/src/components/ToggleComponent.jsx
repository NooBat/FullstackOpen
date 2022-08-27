import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';

const ToggleComponent = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  useImperativeHandle(refs, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          variant='contained'
          color='secondary'
          type='button'
          onClick={() => toggleVisibility()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default ToggleComponent;
