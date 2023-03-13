import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';


const NotFound = () => {
   return (
      <Layout title={" page not found"}>
      <div className="page">
        <h1 className="page-title">404</h1>
        <h2 className="page-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="page-btn">
          Go Back
        </Link>
      </div>
    </Layout>
   );
};

export default NotFound;