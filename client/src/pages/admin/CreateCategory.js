import React, { useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const CreateCategory = () => {
   const [categories,setCategories]=useState([])

   // get all categories

   const getAllCategory=async()=>{
      try {
         
      } catch (error) {
         
      }
   }
  return (
   <Layout>
      <div className="container-fluid m-3 p-3">
         <div className="row">
            <div className="col-md-3">
                  <AdminMenu/>
            </div>
            <div className="col-md-9">
               <div className="card w-75 p-3">
                  <h1>Create Category</h1>
          
               </div>
            </div>
         </div>
      </div>
   </Layout>
  )
}

export default CreateCategory