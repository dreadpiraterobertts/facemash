import React, { useEffect, useState } from 'react'
import check from '../assets/check.png'


const ImageServer = () => {

    const [imageOne,setImageOne]= useState({})
    const [imageTwo,setImageTwo]= useState({})
    const [change,setChange] = useState(true)
    //use effect to fetch two images every time a person votes
    useEffect(()=>{
      const getImages = async () =>{
        fetch('http://localhost:3000/getImages')
        .then((response)=>response.json())
        .then((data)=>{
          setImageOne(data.randomUser1)
          setImageTwo(data.randomUser2)
        })

      } 
      getImages()
      
    },[change])

    const ratingCalculator = async (ids) =>{
      const ratingA = imageOne.rating
      const ratingB = imageTwo.rating
      const k =24
      const Ea = 1/(1+(Math.pow(10 , (ratingB-ratingA)/400)))
      const Eb = 1/(1+(Math.pow(10 , (ratingA-ratingB)/400)))

      let newRatingA;
      let newRatingB;

      if(ids == 0){
        newRatingA = ratingA + k * (1-Ea)
        newRatingB = ratingB + k * (0 - Eb)
        
      }else{
        newRatingA = ratingA + k * (0-Ea)
        newRatingB = ratingB + k * (1 - Eb)
        
      }
    /*   const personOne = {
        id:imageOne._id,
        rating:newRatingA
      }
      const personTwo = {
        id:imageTwo._id,
        rating:newRatingB
      } */

      const persons = {
        personOne : {
          id:imageOne._id,
          rating:newRatingA
        },
        personTwo : {
          id:imageTwo._id,
          rating:newRatingB
        }
      }
      console.log(persons)
      await fetch('http://localhost:3000/update',{
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(persons),
      })
      
    }

    //component of the image beings served
    const Imager = ({img , chk , ids}) =>{
        return(
            <div className='flex flex-col items-center gap-2'>
            <img className='h-96 rounded-md'src={img} alt="" />
            <button onClick={()=>{
              setChange(!change)
              ratingCalculator(ids)
            }}className='h-10 w-10 hover:w-11 hover:shadow-red-600 shadow-md' ><img src={chk} alt="" /></button>
            </div>
        )
    }
  return (
    <div className='flex gap-3  items-center justify-center mt-11'>
        <Imager  img = {imageOne.imageUrl} chk={check} ids = "0"/>
        <Imager img = {imageTwo.imageUrl} chk = {check} ids = "1"/>
        
        {/* Form To Submit the images */}
       
    </div>

  )
}

export default ImageServer