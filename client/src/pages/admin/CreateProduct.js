import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { Select} from 'antd';
import {  useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  
const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all categories

  const getAllCategory = async () => {
   try {
      const { data } = await axios.get("/api/v1/get-category")
      if (data?.success) {
         setCategories(data?.category)
      }
   } catch (error) {
      console.log(error);
      toast.error("something wrong in get all category")
   }
}
// hook
const navigate=useNavigate()
useEffect(() => {
   getAllCategory();
 }, []);

 //create product function

 const handleCreate=async(e)=>{
   e.preventDefault()
   try {
     const productData=new FormData() 
     productData.append("name",name)
     productData.append("description", description)
     productData.append("price", price)
     productData.append("quantity", quantity)
     productData.append("photo", photo);
     productData.append("category", category)

     const {data}= await axios.post("/api/v1/create-product",productData)
     if(data?.error){
      toast.error(data.error)
     
     }else{
      toast.success("product created successfully")
      navigate("/dashboard/admin/products");
     }
   } catch (error) {
      console.log(error);
      toast.error("something went wrong in create product");
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
                  <h1>Create Product</h1>
                  <div className='m-1 w-75'>
                     <Select 
                     bordered={false}
                     placeholder="choose category"
                     size="large"
                     showSearch
                     className="form-select mb-3"
                     onChange={(value) => {
                        setCategory(value);
                      }}
                     >
                        {
                           categories.map((c)=>(
                              <Option key={c._id} value={c._id}>
                                 {c.name}
                              </Option>
                           ))
                        }
                     </Select>
                     <div className="mb-3">
                        <label className="btn btn-outline-secondary col-md-12">
                           {photo ? photo.name :"upload photo"}
                           <input type="file" name="photo" accept='image/*' 
                           onChange={(e)=>setPhoto(e.target.files[0])} // files is defined as array
                           hidden/>
                        </label>
                     </div>
                     <div className="mb-3">
                        {
                           photo && (
                              <div className="text-center">
                                 <img src={URL.createObjectURL(photo)}
                                  alt="product_photo" height={"200px"} className="img-fluid"/>
                              </div>
                           )
                        }
                     </div>
                     <div className="mb-3">
                        <input type="text" className='form-control' value={name} placeholder="write a name" onChange={(e)=>setName(e.target.value)}/>
                     </div>
                     <div className="mb-3">
                        <textarea type="text" className='form-control' value={description} placeholder="write some text" onChange={(e)=>setDescription(e.target.value)}/>
                     </div>
                     <div className="mb-3">
                        <input type="number"className='form-control' value={price} placeholder="write a price" onChange={(e)=>setPrice(e.target.value)}/>
                     </div>
                     <div className="mb-3">
                        <input type="text" className='form-control' value={quantity} placeholder="write a quantity" onChange={(e)=>setQuantity(e.target.value)}/>
                     </div>
                     <div className="mb-3">
                        <Select bordered={false} 
                        placeholder="Select shipping" 
                        size='large'
                        showSearch
                        className='form-select mb-3'
                        onChange={(value)=>setShipping(value)}>
                           <Option value="0">No</Option>
                           <Option value="1">Yes</Option>
                        </Select>
                      </div>
                      <div className="mb-3">
                      <button className="btn btn-primary" onClick={handleCreate}>
                      CREATE PRODUCT
                    </button>
                      </div>
        
                  </div>
               </div>
            </div>
         </div>
      </div>
   </Layout>
   );
};

export default CreateProduct;