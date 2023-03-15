import React from 'react';
import { json } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth';


const Home = () => {
   const[auth,setAuth]=useAuth()
   return (
      <Layout>
         <h1>Home page</h1>
         <pre>
            {JSON.stringify(auth,null,4)}
         </pre>
      </Layout>
   );
};

export default Home;