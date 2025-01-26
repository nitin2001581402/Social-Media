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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../global'

const Tables = () => {
  const [posts, setPosts] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get(`${BASE_URL}/posts/get`)
      .then((res) => {
        console.log(res, 111111)
        setPosts(res.data.posts)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [newPost, setNewPost] = useState(item)
    const handleChange = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })

    const handleEdit = () => {
      setChange(true)
      axios.put(`${BASE_URL}/posts/update/${newPost._id}`, newPost)
        .then((res) => {
          if (res.data.success) {
            alert("Post updated successfully")
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
            <CModalTitle>Edit Post</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  value={newPost.description}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Description"
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




  const Delete = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [newPost, setNewPost] = useState(item)
    const handleChange = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })

    const handleDelete = (id) => {
      setChange(true)
      axios.delete(`${BASE_URL}/posts/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Post Deleted successfully")
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
        <CButton color="danger" onClick={() => setVisible(!visible)}>
          Delete
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Are you sure</CModalTitle>
          </CModalHeader>
          <CModalBody style={{display:"flex",justifyContent:"space-around"}}>
            <CButton onClick={() => handleDelete(item._id)} color="danger">Yes</CButton>
            <CButton onClick={() => setVisible(false)} color='success'>No</CButton>
          </CModalBody>
          {/* <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton onClick={handleEdit} color="primary">Save changes</CButton>
          </CModalFooter> */}
        </CModal >
      </>
    )
  }




  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/posts/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Post deleted successfully")
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
        {/* <CButton color='info' onClick={() => nav('/posts/insert')} >Insert</CButton> */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Posts</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Picture</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {posts.map((item, index) => (
                  <>
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.firstName}</CTableDataCell>
                      <CTableDataCell>{item.lastName}</CTableDataCell>
                      <CTableDataCell>{item.location}</CTableDataCell>
                      <CTableDataCell>{item.description}</CTableDataCell>
                      {item.picturePath ? (
                        <CTableDataCell>
                          <img src={`${BASE_URL}/assets/${item.picturePath}`} alt="Post" style={{ width: '100px' }} />
                        </CTableDataCell>
                      ) : <CTableDataCell></CTableDataCell>}

                      <CTableDataCell>
                        <CButton color="primary" onClick={() => document.getElementById(`accordion${item._id}`).classList.toggle('d-none')}>
                          Details
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        {/* <Edit item={item} /> */}
                        <Delete item={item} />
                        {/* <CButton color='danger' onClick={() => handleDelete(item._id)}>Delete</CButton> */}
                      </CTableDataCell>
                    </CTableRow >
                    <CTableRow key={`details-${item._id}`} id={`accordion${item._id}`} className="d-none">
                      <CTableDataCell colSpan="8">
                        <CAccordion>
                          <CAccordionItem>
                            <CAccordionHeader id={`heading${index}`}>
                              More Details
                            </CAccordionHeader>
                            <CAccordionBody>
                              <p><strong>Likes:</strong> {Object.keys(item.likes).length}</p>
                              <p><strong>Comments:</strong> {item.comments.length}</p>

                              {/* Display comments */}
                              <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
                                {item.comments.length > 0 ? (
                                  [...item.comments].reverse().map((comment, idx) => (
                                    <div key={idx} style={{ marginBottom: '1rem' }}>
                                      <p><strong>{comment.userId.firstName} {comment.userId.lastName}:</strong> {comment.comment}</p>
                                    </div>
                                  ))
                                ) : (
                                  <p>No comments available.</p>
                                )}
                              </div>

                            </CAccordionBody>
                          </CAccordionItem>
                        </CAccordion>
                      </CTableDataCell>
                    </CTableRow>

                  </>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default Tables
