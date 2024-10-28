import React from 'react'
import ImageServer from './components/ImageServer'
import Uploader from './Uploader'
import Rank from './components/Rank'

const App = () => {
  return (
    <div className=''>
      <ImageServer/>
       <Rank/> 
      {/* <Uploader/> */}
      
    </div>
  )
}

export default App