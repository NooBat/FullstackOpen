import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };
  return (
    <footer style={footerStyle}>
      <br />
      <em>Note App, Department of Computer Science, University of Helsinki 2022</em>
    </footer>
  );
};

export default Footer;
