
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { Select} from 'antd';
import {  useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const ProductUpdate = () => {
   const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
       const [id,setId] =useState("")
  const [photo, setPhoto] = useState("");
   const params=useParams()

   //get single product 

   const getSingleProduct=async()=>{
      try {
         const {data}=await axios.get(`/api/v1/single-product/${params.slug}`)
         if(data?.success){
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
         }
      } catch (error) {
         console.log(error);
      }
   }

   // use hook 

   useEffect(()=>{
      getSingleProduct()
     //eslint-disable-next-line
   },[])

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

 //update product function

 const handleUpdate=async(e)=>{
   e.preventDefault()
   try {
     const productData=new FormData() 
     productData.append("name",name)
     productData.append("description", description)
     productData.append("price", price)
     productData.append("quantity", quantity)
     photo && productData.append("photo", photo);
     productData.append("category", category)

     const {data}= await axios.put(`/api/v1/update-product/${id}`,productData)
     if(data?.error){
      toast.error(data?.error)
     
     }else{
      toast.success("product updated successfully")
      navigate("/dashboard/admin/products");
     }
   } catch (error) {
      console.log(error);
      toast.error("something went wrong in update product");
   }
 }

 const handleDelete=async()=>{
   try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/delete-product/${id}`
      );
      toast.success((`"${data.name}" is deleted`));
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleted");
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
               <h1>Update Product</h1>
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
                   value={category}
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
                        photo ? (
                           <div className="text-center">
                              <img src={URL.createObjectURL(photo)}
                               alt="product_photo" height={"200px"} className="img-fluid"/>
                           </div>
                        ):(
                           <div className="text-center">
                              <img src={`/api/v1/product-photo/${id}`}
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
                     onChange={(value)=>setShipping(value)}  value={shipping ? "yes" : "No"}>
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                     </Select>
                   </div>
                   <div className="mb-3 d-flex justify-content-between ">
                   <button className="btn btn-primary mb-5" onClick={handleUpdate}>
                   UPDATE PRODUCT
                 </button>
                 <button onClick={handleDelete} className="btn btn-danger mb-5">
                Delete
              </button>
                   </div>
     
               </div>
            </div>
         </div>
      </div>
   </div>
</Layout>
  )
}

export default ProductUpdate