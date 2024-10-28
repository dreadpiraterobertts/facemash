import React, { useEffect, useState } from 'react'

const Rank = () => {

    const[people,setPeople] = useState([])
     useEffect(()=>{
        fetch('http://localhost:3000/getPeople')
        .then((response)=>response.json())
        .then((data)=>{
          setPeople(data)
        })

        console.log(people)
    },[])

    const filteredPeople = people.sort((a, b) => b.rating - a.rating);
  return (
        <div className="flex items-center justify-center p-6">
        <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            </tr>
        </thead>
        <tbody>
            {filteredPeople.map((p, index) => (
            <tr key={index} className="hover:bg-gray-100 hover:text-black">
                <td><img src={p.imageUrl} alt=""  className="w-16 h-16 object-cover rounded-full mx-auto" /></td>
                <td className="border border-gray-300 px-4 py-2 text-center">{p.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{parseInt(p.rating)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  
  )
}

export default Rank