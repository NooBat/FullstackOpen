import React from 'react';
import styled from '@emotion/styled';

import { widths, unit } from '../styles';

import Footer from './footer';
import Header from './header';

/**
 * Layout renders the full page content:
 * with header, Page container and footer
 */
const Layout = ({ fullWidth, children, grid }) => (
  <>
    <Header />
    <PageContainer fullWidth={fullWidth} grid={grid}>
      {children}
    </PageContainer>
    <Footer />
  </>
);

export default Layout;

/** Layout styled components */
const PageContainer = styled.div((props) => ({
  display: 'flex',
  justifyContent: props.grid ? 'center' : 'top',
  flexDirection: props.grid ? 'row' : 'column',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5,
}));
