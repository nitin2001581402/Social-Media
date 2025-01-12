import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [categories, setCategories] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5005/api/package/get")
      .then((res) => {
        if (res.data.success) {
          setPackages(res.data.packages);
          setCategories(res.data.categoriess);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while fetching packages.");
      });
  }, [change])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5005/api/package/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Package deleted successfully")
          setChange(!change)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const nav = useNavigate()
  const Edit = ({ pkg }) => {
    const [visible, setVisible] = useState(false)
    const [editPackage, setEditPackage] = useState({
      packageName: pkg.packageName,
      description: pkg.description,
      prices: pkg.prices,
      days: pkg.days,
      images: pkg.images,
      noOfPeople: pkg.noOfPeople,
      status: pkg.status,
      categoryId: pkg.categoryId._id,
      categoryName: pkg.categoryId.name
    })

    const handleChange = (e) => setEditPackage({ ...editPackage, [e.target.name]: e.target.value })
    const handleChangeImage = (e) => {
      setEditPackage({ ...editPackage, [e.target.name]: e.target.files[0] });
    };
    const handleChangeImage2 = (e) => {
      setEditPackage({ ...editPackage, [e.target.name]: Array.from(e.target.files) });
    };

    const handleEdit = (e) => {
      e.preventDefault();
      let formData = new FormData()
      formData.append('categoryId', editPackage.categoryId)
      formData.append('packageName', editPackage.packageName)
      formData.append('description', editPackage.description)
      formData.append('prices', editPackage.prices)
      formData.append('days', editPackage.days)
      formData.append('noOfPeople', editPackage.noOfPeople)


      formData.append('images', editPackage.images)

      if (Array.isArray(editPackage.photos)) {
        editPackage.photos.forEach((item, index) => {
          if (item instanceof File) {
            formData.append('photos', item);
          } else {
            console.error(`editPackage.photos[${index}] is not a File object`);
          }
        });
      } else {
        console.error('editPackage.photos is not an array');
      }
      axios.put(`http://localhost:5005/api/package/update/${pkg._id}`, formData)
        .then((res) => {
          if (res.data.success) {
            alert("Package updated successfully")
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
    console.log(editPackage, 111222)
    console.log(packages, 11111)

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Package</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm encType='multipart/form-data'>
              <div className="mb-3">
                <CFormLabel htmlFor="categoryId">Category ID</CFormLabel>

                <CFormSelect onChange={handleChange} required name="categoryId" aria-label="Default select example">
                  <option value={editPackage?.categoryId}>{editPackage?.categoryName}</option>
                  {categories.map((item) => {
                    return <option value={item._id}>{item.name}</option>
                  })}


                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="packageName">Package Name</CFormLabel>
                <CFormInput
                  value={editPackage.packageName}
                  type="text"
                  name="packageName"
                  id="packageName"
                  placeholder="Enter Package Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  value={editPackage.description}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="prices">Prices</CFormLabel>
                <CFormInput
                  value={editPackage.prices}
                  type="number"
                  name="prices"
                  id="prices"
                  placeholder="Enter Prices"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="days">Days</CFormLabel>
                <CFormInput
                  value={editPackage.days}
                  type="number"
                  name="days"
                  id="days"
                  placeholder="Enter Days"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="images">Images</CFormLabel>
                <CFormInput
                  // value={editPackage.images}
                  type="file"
                  name="images"
                  id="images"
                  onChange={handleChangeImage}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="photos">Photos</CFormLabel>
                <CFormInput
                  // value={editPackage.images}
                  type="file"
                  name="photos"
                  id="photos"
                  multiple
                  onChange={handleChangeImage2}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="noOfPeople">Number of People</CFormLabel>
                <CFormInput
                  value={editPackage.noOfPeople}
                  type="number"
                  name="noOfPeople"
                  id="noOfPeople"
                  placeholder="Enter Number of People"
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

  return (
    <CRow>
      <CCol xs={12}>
        <CButton color='info' onClick={() => nav('/package/insert')}>Insert</CButton>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Packages</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Package Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Prices</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Days</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Images</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Number of People</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {packages.map((pkg, index) => (
                  <CTableRow key={pkg._id}>
                    <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                    <CTableDataCell>{pkg?.categoryId?.name}</CTableDataCell>
                    <CTableDataCell>{pkg?.packageName}</CTableDataCell>
                    <CTableDataCell>{pkg?.description}</CTableDataCell>
                    <CTableDataCell>{pkg?.prices}</CTableDataCell>
                    <CTableDataCell>{pkg?.days}</CTableDataCell>
                    <CTableDataCell><img style={{ height: "100px", width: "100px" }} src={`http://localhost:5005/uploads/${pkg.images}`} alt="" /></CTableDataCell>
                    <CTableDataCell>{pkg?.noOfPeople}</CTableDataCell>
                    <CTableDataCell>{pkg?.status}</CTableDataCell>
                    <CTableDataCell>{new Date(pkg?.date).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>
                      <Edit pkg={pkg} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color='danger' onClick={() => handleDelete(pkg._id)}>Delete</CButton>
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

export default Packages
