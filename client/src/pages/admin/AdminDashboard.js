import React from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
   const[auth]=useAuth()
   return (
      <Layout>
         <div className="container-fluid m-3 p-3 dashboard-menu">
            <div className="row">
               <div className="col-md-3">
                     <AdminMenu/>
               </div>
               <div className="col-md-9">
                  <div className="card w-75 p-3">
                     <h4>Admin Name:{auth?.user?.name}</h4>
                     <h4>Admin email:{auth?.user?.email}</h4>
                     <h4>Admin phone:{auth?.user?.phone}</h4>
             
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default AdminDashboard;