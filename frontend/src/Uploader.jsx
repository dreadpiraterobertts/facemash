import React, { useState } from 'react'


const Uploader = () => {

    const[image,setImage] = useState("")

    const[uploadDetails,setUploadDetails] = useState({
        name:"",
        imageUrl:"",
        rating:0
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }
    const changeHandler = (e)=>{
        setUploadDetails({name:e.target.value ,rating:700})
    }

    const AddUser = async (e) =>{

        e.preventDefault()

        let responseData;
        let uploadee = uploadDetails
        let formData = new FormData()
        formData.append('image' , image)

        await fetch('http://localhost:3000/upload',{
            method:"POST",
            header:{
                Accept:"application/json",
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            uploadee.imageUrl = responseData.image_url

            await fetch('http://localhost:3000/addperson',{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(uploadee),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }

        console.log(uploadee.name + "  " + uploadee.imageUrl + "  " + uploadee.rating)
    }

  return (
    <div>
    <form onSubmit={AddUser}>
      <label htmlFor="name"> Name : </label>
      <input className="text-black " type="text" name="name" onChange={changeHandler}/>
      <input type="file" name="image" onChange={imageHandler}/>
      <button className="bg-black rounded-md p-1 hover:bg-[rgba(0,0,0,0.5)]"type="submit" >Submit</button>
    </form>
  </div>
  )
}

export default Uploader