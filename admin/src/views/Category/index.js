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
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../global'
import moment from 'moment'

const Tables = () => {
  const [category, setCategory] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get(`${BASE_URL}/categories/get`)
      .then((res) => {
        console.log(res, 111111)
        setCategory(res.data.categories)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [newCategory, setNewCategory] = useState(item)
    const handleChange = (e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value })

    const handleEdit = () => {
      setChange(true)
      axios.put(`${BASE_URL}/categories/update/${newCategory._id}`, { name: newCategory.name })
        .then((res) => {
          if (res.data.success) {
            alert("Category updated successfully")
          } else {
            alert(res.data.message)
          }
          setVisible(false)
          setChange(false)
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
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Category Name</CFormLabel>
                <CFormInput
                  value={newCategory.name}
                  type="text"
                  name="name"
                  id="exampleFormControlInput1"
                  placeholder="Enter Category Name"
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
    axios.delete(`${BASE_URL}/categories/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Category deleted successfully")
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
        <CButton color='info' onClick={() => nav('/categories/insert')} >Insert</CButton>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Categories</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Updated</CTableHeaderCell>
                  <CTableHeaderCell align='center' colSpan={2} scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {category.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{moment(item.createdAt).format("L")}</CTableDataCell>
                    <CTableDataCell>{moment(item.updatedAt).format("L")}</CTableDataCell>
                    <CTableDataCell>
                      <Edit item={item} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color='danger' onClick={() => handleDelete(item._id)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
