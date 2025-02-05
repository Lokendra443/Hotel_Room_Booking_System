// import React, { useEffect, useState } from 'react'
// import { getAllRooms } from '../utils/ApiFunctions'
// import { Col } from 'react-bootstrap'
// import RoomFilter from '../common/RoomFilter'
// import RoomPaginator from '../common/RoomPaginator'

// const ExistingRooms = () => {

//     const [rooms, setRooms] = useState([])
//     const [currentPage, setCurrentPage] = useState(1)
//     const [roomsPerPage, setRoomsPerPage] = useState(8)
//     const [isLoading, setIsLoading] = useState(false)
//     const [filteredRooms, setFilteredRooms] = useState([])
//     const [selectedRoomType, setSelectedRoomType] = useState([])
//     const [successMessage, setSuccessMessage] = useState("")
//     const [errorMessage, setErrorMessage] = useState("")

//     useEffect(() => {
//         fetchRooms()
//     }, [])


//     const fetchRooms = async() =>{
//         setIsLoading(true)
//         try {
//             const result = await getAllRooms()
//             setRooms(result)
//             setIsLoading(false)
//         } catch (error) {
//             setErrorMessage(error.message)
            
//         }
//     }

//     useEffect(() =>{
//         if(selectedRoomType === ""){
//             setFilteredRooms(rooms)
//         }
//         else{
//             const filtered = rooms.filter(room => room.roomType === selectedRoomType)
//             setFilteredRooms(filtered)
//         }
//         setCurrentPage(1)
//     }, [rooms, selectedRoomType])

//     const handlePaginationClick =(pageNumber) =>{
//         setCurrentPage(pageNumber)
//     }


//     const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) =>{
//         const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
//         return Math.ceil(totalRooms / roomsPerPage)
//     }

//     const indexOfLastRoom = currentPage * roomsPerPage
//     const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
//     const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)


//   return (
//     <>
//     {isLoading ? (
//         <p>Loading existing rooms</p>
//     ): (
//         <>
//         <section className='mt-5 mb-5 container'>
//             <div className='d-flex justify-content-center mb-3 mt-5'>
//                 <h2>Existing Rooms</h2>
//             </div>

//             <Col md={6} className='mb-3 mb-md-0'>
//                 <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
            
//             </Col>

//             <table className='table table-bordered table-hover'>
//                 <thead>
//                     <tr className='text-center'>
//                         <th>Id</th>
//                         <th>Room Type</th>
//                         <th>Room Price</th>
//                         <th>Actions</th>
                        
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {currentRooms.map((room) =>(
//                         <tr key={room.id} className='text-center'>
//                             <td>{room.id}</td>
//                             <td>{room.roomType}</td>
//                             <td>{room.roomPrice}</td>
//                             <td>
//                                 <button>View / Edit</button>
//                                 <button>Delete</button>
//                             </td>
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <RoomPaginator
//             currentPage = {currentPage}
//             totalPages = {calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
//             onPageChange = {handlePaginationClick}
//             />






//         </section>
        
        
//         </>
//     )}
      
//     </>
//   )
// }

// export default ExistingRooms


import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { Col, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'


const ExistingRooms = () => {
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            console.log("API Response:", result)
            setRooms(result)
            setFilteredRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms)
        } else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])



    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async(roomId) =>{
        try {
            const result = await deleteRoom(roomId)
            console.log("API Response:", result)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was delete successfully`)
                fetchRooms()
            }else{
                console.error(`Error deleting room: ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
        <div className='container col-12 col-lg-8 mt-5 mb-5'>
            
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2 >Existing Rooms</h2>
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

            <Row>

                <Col md={6} className='mb-2 md-mb-0'>
                    <RoomFilter 
                        data={rooms} 
                        setFilteredData={setFilteredRooms}
                        setSelectedRoomType={setSelectedRoomType}
                    />
                </Col>

                <Col md={6} className='d-flex justify-content-end'>
                    <Link to={"/add-room"} className=' mb-2'>
                    <span className='btn btn-primary'><FaPlus/> Add Room</span>
                        
                    
                    </Link>
                </Col>


            </Row>
            
            
            

            <table className='table table-bordered table-hover'>
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Room Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.length > 0 ? (
                        currentRooms.map(room => (
                            <tr key={room.id} className='text-center'>
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>${room.roomPrice}/night</td>
                                <td className='gap-2'>
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span className='btn btn-info btn-sm me-1'><FaEye/></span>
                                        <span className='btn btn-warning btn-sm me-1'><FaEdit/></span>
                                    
                                    </Link>


                                    <button className='btn btn-danger btn-sm'
                                    onClick={() => handleDelete(room.id)}
                                    >
                                        <FaTrashAlt/>
                                       
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center'>
                                {isLoading ? 'Loading rooms...' : 'No rooms found'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {filteredRooms.length > roomsPerPage && (
                <RoomPaginator
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredRooms.length / roomsPerPage)}
                    onPageChange={handlePaginationClick}
                />
            )}

        
        </div>
        
    )
}

export default ExistingRooms