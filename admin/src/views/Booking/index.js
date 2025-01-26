import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'


const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5005/api/booking/get")
      .then((res) => {
        console.log(res, 111111)
        setBookings(res.data.booking)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])
  let nav = useNavigate()

  const Edit = ({ booking }) => {
    const [visible, setVisible] = useState(false)
    const [newBooking, setNewBooking] = useState({ status: booking.status })

    const handleChange = (e) => setNewBooking({ ...newBooking, [e.target.name]: e.target.value })

    const handleEdit = () => {
      axios.put(`http://localhost:5005/api/booking/update/${booking._id}`, newBooking)
        .then((res) => {
          if (res.data.success) {
            alert("Booking updated successfully")
            setChange(!change)
          } else {
            alert(res.data.message)
          }
          setVisible(false)
        })
        .catch((err) => {
          alert(err.message)
          setVisible(false)
        })
    }

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Booking</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="status">Status</CFormLabel>
                <CFormInput
                  value={newBooking.status}
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Enter Status"
                  onChange={handleChange}
                  required
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton onClick={handleEdit} color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5005/api/booking/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Booking deleted successfully")
          setChange(!change)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bookings</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Package ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Number of People</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bookings.map((booking, index) => {
                  return(
                  <CTableRow>
                    <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                    <CTableDataCell>{booking?.packageId}</CTableDataCell>
                    <CTableDataCell>{booking?.userId}</CTableDataCell>
                    <CTableDataCell>{booking?.noOfPeople}</CTableDataCell>
                    <CTableDataCell>{booking?.amount}</CTableDataCell>
                    <CTableDataCell>{booking?.status}</CTableDataCell>
                    <CTableDataCell>{new Date(booking.date).toLocaleDateString()}</CTableDataCell>
                 
                    <CTableDataCell>
                      <Edit booking={booking} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color='danger' onClick={() => handleDelete(booking._id)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                )})}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Bookings
