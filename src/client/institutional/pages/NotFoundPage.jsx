import React from 'react';
import Helmet from 'react-helmet';

const NotFoundPage = () => (
  <div style={{marginTop: '6rem'}}>
    <Helmet
      title='Página não encontrada' />
    <p style={{textAlign: 'center'}}>Oops! Página não encontrada.</p>
  </div>
);

export default NotFoundPage;

