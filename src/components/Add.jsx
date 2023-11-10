import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({setUploadVideoStatus}) {
  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//to fetch datas from input
  const [videos,setVideos] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })

  const embedVideoLink = (e)=>{
    const{value} = e.target
    console.log(value.slice(-11));
    const Link = `https://www.youtube.com/embed/${value.slice(-11)}`
    setVideos({...videos,embedLink:Link})
  }

  console.log(videos);


 const handleUpload = async()=>{

  const {id, caption, url, embedLink} = videos 
  if(!id || !caption || !url ||!embedLink){
    toast.warning('Please fill the form completely')
  }
  else{
    const response = await uploadVideo(videos)
    console.log(response);
    if(response.status>=200 && response.status<=300){
      setUploadVideoStatus(response.data)
      toast.success('uploaded successfully')

      //close modal
      handleClose()
    }
    else{
      console.log(response);
      toast.error('something went wrong, try again later')
    }
  }
 }


  
  

  return (
    <>
     <div className='d-flex align-items-center'>
       <h5>Upload New Video</h5>
        <button onClick={handleShow}  className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>

    </div>

<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title ><i class="fa-solid fa-film me-2 text-warning fs-3 "></i> Upload Videos</Modal.Title>
</Modal.Header>
<Modal.Body>
  <form className='border border-secondary p-3 rounded'>
  <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Control onChange={(e)=>setVideos({...videos,id:e.target.value})} type="text" placeholder="Enter VideoID" />
  </Form.Group>

  <Form.Group   className="mb-3" controlId="formBasicEmail">
       <Form.Control onChange={(e)=>setVideos({...videos,caption:e.target.value})}   type="text" placeholder="Enter Video Caption" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Control onChange={(e)=>setVideos({...videos,url:e.target.value})}  type="text" placeholder="Enter Video Image Url" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Control onChange={embedVideoLink}  type="text" placeholder="Enter YouTube Video Link" />
  </Form.Group>


  </form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Cancel
  </Button>
  <Button onClick={handleUpload} variant="primary">Upload</Button>
</Modal.Footer>
</Modal>
<ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Add