import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'


const Products = () => {
   const [products,setProducts]=useState([])

   // get all prodyucts
   const getAllProducts=async()=>{
      try {
         const {data}=await axios.get("/api/v1/get-product")
         setProducts(data.products)
      } catch (error) {
         console.log(error);
         toast.error("something went wrong getting all products")
      }
   }

   // data fetch
   useEffect(()=>{
      getAllProducts()
   },[])

  return (
    <Layout>
      <div className="row">
         <div className="col-md-3">
            <AdminMenu/>
         </div>
         <div className="col-md-9">
            <h2 className='text-center'>All Products List</h2>
               <div className="d-flex flex-wrap">
               {products?.map((p)=>(
                  <Link key={p._id} to={`/dashboard/admin/products/${p.slug}` } className="product-link">
                   <div className="card m-2" style={{width: "18rem"}} >
              <img src={`/api/v1/product-photo/${p._id}`} className="card-img-top img img-fluid rounded-start" alt={p.name}/>
            <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description}</p>
            
    
                  </div>
            </div>
                  </Link>
                
               ))}
               </div>
           
         </div>
      </div>
    </Layout>
  )
}

export default Products