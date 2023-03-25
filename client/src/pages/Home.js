import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth';
import {Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices';

const Home = () => {
   // const[auth,setAuth]=useAuth()
   const [products,setProducts]=useState([])
    const [categories,setCategories]=useState([])
    const [checked,setChecked]=useState([])
    const [radio,setRadio]=useState([])
    const [total,setTotal]=useState(0)
    const[page,setPage]=useState(1)
    const[loading,setLoading]=useState(false)

   //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
   getAllCategory()
   getTotalCount()
  
},[])


   // get all products
   const getAllProducts=async()=>{
      try {
         setLoading(true);
         const {data}=await axios.get(`/api/v1/product-page/${page}`)
         setLoading(false);
         setProducts(data?.products)
         //console.log(data.products);
        
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }

   // get total count
   const getTotalCount=async()=>{
      try {
        const {data}=await axios.get('/api/v1/product-count') 
        setTotal(data?.total)
      } catch (error) {
         console.log(error)
      }
   }
      // load page by hook
      useEffect(()=>{
      if(page===1) return   
      loadMorePage()
      },[page])
   // load more page
   const loadMorePage=async()=>{
      try {
         setLoading(true)
         const {data}=await axios.get(`/api/v1/product-page/${page}`)
         setLoading(false)
         setProducts([...products,...data?.products])
      } catch (error) {
         console.log(error);
         setLoading(false)
      }
   }
// filter by cat
  const handleFilter=(value,id)=>{
      let allCat=[...checked]
      if(value){
         allCat.push(id)
      }else{
         allCat=allCat.filter((c)=>c!==id)
      }
      setChecked(allCat)
  }

  useEffect(()=>{
     
   if(!checked.length || !radio.length)getAllProducts()
  },[checked.length, radio.length])


  useEffect(()=>{
     
   if(checked.length || radio.length)filteredProducts()
  },[checked, radio])



  
// get filtered products
const filteredProducts=async()=>{
   try {
      const {data}=await axios.post('/api/v1/product-filters',{
      checked,
        radio
      });
      setProducts(data?.products)
   } catch (error) {
      console.log(error)
   }
}

   return (
      <Layout>
        <div className="container-fluid row mt-3">
          <div className="col-md-3">
            <h3 className='p-3 mt-2 mb-2 h4 bg-light text-center'>Filter by Category</h3>
            <div className="d-flex flex-column">
               {
                  categories?.map((c)=>{
                   return  <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                        {c.name}
                     </Checkbox>
                  })
               }
            </div>
                {/* price filter */}
                <h3 className='text-center mt-4'>Filter by Price</h3>
                <div className="d-flex flex-column">
                <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                     {
                        Prices?.map((p)=>{
                           return <div key={p._id} >
                              <Radio value={p.array}>{p.name}</Radio>
                           </div>
                        })
                     }
                </Radio.Group>
                </div>
                <div className="d-flex flex-column mt-3 w-50">
                  <button className='btn btn-outline-danger' onClick={()=>window.location.reload()}>Reset All</button>
                </div>
             </div>
            <div className="col-md-9">
               {/* {JSON.stringify(radio,null,4)} */}
            <h1 className='text-center'>All products</h1>
            
            <div className="d-flex flex-wrap">
            {products?.map((pd)=>(
            
            <div className="card m-2" style={{width: "18rem"}} key={pd._id}>
              <img src={`/api/v1/product-photo/${pd._id}`} 
              className="card-img-top img img-fluid rounded-start" 
              alt={pd.name}/>
            <div className="card-body">
            <h5 className="card-title">{pd.name}</h5>
            <p className="card-text">{pd.description.substring(0,25)}...</p>
            <p className="card-text">${pd.price}</p>
            <button className='btn btn-primary ms-2'>More Details</button>
            <button className='btn btn-secondary ms-2'>Add to Cart</button>
            </div>
            </div>
                    
               ))}
            </div>
            {/* total count */}
            <div className='m-2 p-3'>
             {
               products && products.length <total &&(
                  <button className='btn btn-outline-primary p-2'
                  onClick={(e)=>
                  {e.preventDefault();
                  setPage(page+1)}}>
                  {loading ?"loading...":"loadMore"}
                  </button>
               )
             }
         </div>
         </div>        
    </div>
    
      </Layout>
   );
};

export default Home;