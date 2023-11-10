import React, { useState } from 'react'
import Add from '../components/Add'
import {Link} from 'react-router-dom'
import View from '../components/View'
import Category from '../components/Category'



function Home() {

   const[uploadVideoStatus,setUploadVideoStatus] = useState({})

  return (
    <>
      <div1 className='container d-flex justify-content-between mt-5 mb-5  align-items-center  ' >

      <div className='add-videos'>
      
      <Add setUploadVideoStatus={setUploadVideoStatus} />
    
      </div>
       <Link to={'/watch-history'} style={{textDecoration:'none', color:'white', fontSize:'30px'}}>Watch History</Link>
    
    </div1>

    <div2 className='container-fluid w-100 d-flex justify-content-between mt-5 mb-5  '>

   
         <div className='all-videos col-lg-9'>
          <h4 className='mb-5'>All Videos</h4>
          <View uploadVideoStatus={uploadVideoStatus}/>
         </div>

         <div className='category col-lg-3'> 
           <Category />
         </div>
      

    </div2>


   
    </>
  )
}

export default Home