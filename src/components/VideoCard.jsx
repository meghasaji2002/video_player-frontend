import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteCategoryVideo, deleteVideos } from '../services/allAPI';


function VideoCard({displayVideo,setDeleteVideoStatus,ispresent,setDeleteCategoryVideoStatus}) {
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow =async () => {setShow(true)
    const {caption,embedLink} = displayVideo 

    

    let today = new Date()
    console.log(today);
    let timestamp= new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
    console.log(timestamp);
    let videoDetails = {
      caption,embedLink,timestamp
    }
    await addToHistory(videoDetails)
  }

  const removeVideo = async(id)=>{
      const response = await deleteVideos(id)
      setDeleteVideoStatus(true)
      console.log(response);
  }

  const removeCategoryVideo = async(id)=>{
    const response = await deleteCategoryVideo(id)
    setDeleteCategoryVideoStatus(true)
  }
    

//function to drag the videocard
 const cardDrag =(e,id)=>{
  console.log(`The id of the dragged video is ${id}`);
  e.dataTransfer.setData("videoId",id) 
 }

  return (
    <div >
      
      <Card style={{ width: '100%', height:'300px' }} className='mb-3' draggable onDragStart={(e)=>cardDrag(e,displayVideo?.id)}>
      <Card.Img variant="top" style={{height:'200px'}} src={displayVideo.url} onClick={handleShow} />
      <Card.Body>
        <Card.Title className='d-flex  align-items-center'>
           <h6>{displayVideo.caption}</h6>
          
           { !ispresent?
           
           <button onClick={()=>{removeVideo(displayVideo?.id)}} className='btn btn-danger ms-5 '><i class="fa-solid fa-trash-can"></i></button>:
           <button onClick={()=>{removeCategoryVideo(displayVideo?.id)}}  className='btn btn-warning ms-auto '><i class="fa-solid fa-trash-can"></i></button>}
            </Card.Title>
       
      </Card.Body>
    </Card>
    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="379" src={`${displayVideo.embedLink}?autoplay=1`}title={displayVideo.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
       
      </Modal>
    </div>
  )
}

export default VideoCard