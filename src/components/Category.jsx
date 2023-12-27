import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addAllCategory, deleteCategory, getAVideo, getAllCategories, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row,Col } from 'react-bootstrap';
import VideoCard from './VideoCard';

function Category() {
const[deleteCategoryVideoStatus,setDeleteCategoryVideoStatus] = useState(false)

  const [categoryName,setCategoryName]=useState("")
  const [category,setCategory] = useState([])

  //function to add category
  const addCategory = async()=>{
    console.log(categoryName);

    //to store category
   if(categoryName){
    let body ={
      categoryName,
      allVideos:[]
    }
   const response= await addAllCategory(body)
   console.log(response);
   if(response.status>=200 && response.status<300){
    toast.success('category added successfully')
    
    // state value is made null
    setCategoryName("")
    
    //close the modal
    handleClose()
    
    //to get the category
    allCategory()
   }
   else{
    toast.error('something went wrong,Please try again')
   }
   }
   else{
    toast.warning('please enter a category name')
   }
  }

  //function to get all categories
  const allCategory = async()=>{
    const {data} = await getAllCategories()
    // console.log(data);
    setCategory(data)
  }
   console.log(category);



   //function to delete category
   const deleteACategory =async(id)=>{
    await deleteCategory(id)
    // to get the remaining categories
     allCategory()
   }


   useEffect(()=>{
    allCategory()
    setDeleteCategoryVideoStatus(false)
   },[deleteCategoryVideoStatus])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //function to prevent reload so that the data that we send wont lost
  const dragOver =  (e)=>{
    e.preventDefault()
  }


  const videoDrop =async(e,categoryId)=>{
    console.log(`dropped on the category id :` ,categoryId);
    //to get the data send from videoCard
    let videoId = e.dataTransfer.getData("videoId")
    console.log(videoId );
    const {data}=await getAVideo(videoId)
    console.log(data);
    const selectedCategory = category.find(item=>item.id===categoryId)
    // console.log(selectedCategory);
    selectedCategory.allVideos.push(data)
    console.log( selectedCategory);

    await updateCategory(categoryId,selectedCategory)
    allCategory()

  }

  return (
    <>
    
    <div className='d-grid ms-3'>
       <button onClick={handleShow}   className='btn btn-warning'>Add New Category</button>
    </div>

    {category?.length>0?
    category?.map((item)=>( <div className='m-5 border border-secondary p-3 rounded'>
    <div className='d-flex justify-content-between align-items-center ' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
      <h6 >{item.categoryName}</h6>
      <button onClick={()=>deleteACategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></button>
    </div>

    <Row className='mt-2'>
      <Col >
     {
       item?.allVideos?.length>0?
       item?.allVideos?.map((card)=>( <VideoCard displayVideo={card} ispresent={true} setDeleteCategoryVideoStatus={setDeleteCategoryVideoStatus}/>))
       :<p>Nothing to display</p>
     }
      </Col>
    </Row>
  </div>))
     
    :<p className='ms-3 fw-bolder fs-5 text-danger'>No category added</p>
    }

<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title className=''><i class="fa-solid fa-pencil me-2 fs-3 text-warning"></i>Add New Category</Modal.Title>
</Modal.Header>
<Modal.Body>
  <form className='border border-secondary p-3 rounded'>
 

  <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Control onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder="Enter Category Name" />
  </Form.Group>

 

  </form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Cancel
  </Button>
  <Button onClick={addCategory} variant="primary">Add</Button>
</Modal.Footer>
</Modal>

    </>
  )
}

export default Category