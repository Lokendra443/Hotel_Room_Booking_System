import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'


const AddRoom = () => {

    const [newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) =>{
        const name = e.target.name
        let value = e.target.value
        console.log(`Field: ${name}, Value: ${value}`);
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value, 10);

            }
                
        }
        setNewRoom({...newRoom, [name]: value})
    }

    console.log("Updated room state:", newRoom);

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("A new room was added to the database!")
                setNewRoom({photo: null, roomType: "", roomPrice: ""})
                setImagePreview("")
                setErrorMessage("")

            }else{
                setErrorMessage("Failed to add a new room to the database!")
            }
            
        } catch (error) {
            setErrorMessage(error.message)
            
        }
    }


  return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>

            <div className='col-md-8 col-lg-6'>
                <div className='d-flex justify-content-center mb-3 mt-5'>
                    <h2 className='mt-5 mb-2'>Add a New Room</h2>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                </div>
                

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='roomType' className='form-label'>
                            Room Type
                        </label>
                        <div>
                            <RoomTypeSelector 
                            handleRoomInputChange={handleRoomInputChange} 
                            newRoom={newRoom}
                            />

                        </div>

                    </div>


                    <div className='mb-3'>
                        <label htmlFor='roomPrice' className='form-label'>
                            Room Price
                        </label>
                        <input
                        className='form-control'
                        required
                        id='roomPrice'
                        name="roomPrice"
                        type="number"
                        value={newRoom.roomPrice}
                        onChange={handleRoomInputChange}
                        />
                        

                    </div>


                    <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'>
                            Room Photo
                        </label>
                        <input 
                        id='photo'
                        name='photo'
                        type='file'
                        className='form-control'
                        onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img src={imagePreview} 
                            alt="Preview Room Photo" 
                            style={{maxWidth: "400px", maxHeight: "400px"}}
                            className='mb-3'
                            />
                        )}

                    </div>


                    <div className='d-grid d-md-flex mt-2'>

                        <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5 me-2'>
                            Back
                        </Link>

                        <button className='btn btn-outline-primary ml-5'>Save Room</button>
                    </div>


                </form>

            </div>


        </div>
    </section>

    
    
    
    </>
  )
}

export default AddRoom
