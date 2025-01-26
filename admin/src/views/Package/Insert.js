import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../global'

const FormControl = () => {
  let nav = useNavigate();
  const [newPackage, setNewPackage] = useState({
    categoryId: '',
    packageName: '',
    description: '',
    prices: '',
    days: '',
    images: '',
    noOfPeople: '',
    status: '',
  });

  const handleChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };
  const handleChangeImage = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.files[0] });
  };
  const handleChangeImage2 = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: Array.from(e.target.files) });
  };
  console.log(newPackage, 66666)

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('categoryId', newPackage.categoryId)
    formData.append('packageName', newPackage.packageName)
    formData.append('description', newPackage.description)
    formData.append('prices', newPackage.prices)
    formData.append('days', newPackage.days)
    formData.append('noOfPeople', newPackage.noOfPeople)
    formData.append('status', newPackage.status)

    formData.append('images', newPackage.images)
      
    if (Array.isArray(newPackage.photos)) {
      newPackage.photos.forEach((item, index) => {
        if (item instanceof File) {
          formData.append('photos', item);
        } else {
          console.error(`newPackage.photos[${index}] is not a File object`);
        }
      });
    } else {
      console.error('newPackage.photos is not an array');
    }

    axios.post(`${BASE_URL}/package/insert`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Package added successfully");
          nav('/package');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the package. Please try again.");
      });
  };
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5005/api/categories/get')
      .then((res) => {
        console.log(res, 111)
        setCategories(res.data.category)
      })
      .catch((err) => {
        console.log(err, 222)
      })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Package</strong>
          </CCardHeader>
          <CCardBody>
            <CForm encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="categoryId">Category ID</CFormLabel>

                <CFormSelect onChange={handleChange} required name="categoryId" aria-label="Default select example">
                  <option disabled selected value="">Select Category</option>
                  {categories.map((item) => {
                    return <option value={item._id}>{item.name}</option>
                  })}


                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="packageName">Package Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="packageName"
                  name="packageName"
                  placeholder="Enter Package Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="prices">Prices</CFormLabel>
                <CFormInput
                  type="number"
                  id="prices"
                  name="prices"
                  placeholder="Enter Prices"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="days">Days</CFormLabel>
                <CFormInput
                  type="number"
                  id="days"
                  name="days"
                  placeholder="Enter Days"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="images">Images</CFormLabel>
                <CFormInput
                  type="file"
                  id="images"
                  name="images"

                  onChange={handleChangeImage}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="photos">Photos</CFormLabel>
                <CFormInput
                  type="file"
                  id="photos"
                  name="photos"
                  multiple
                  // placeholder="Enter Image URL"
                  onChange={handleChangeImage2}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="noOfPeople">Number of People</CFormLabel>
                <CFormInput
                  type="number"
                  id="noOfPeople"
                  name="noOfPeople"
                  placeholder="Enter Number of People"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="status">Status</CFormLabel>
                <CFormInput
                  type="text"
                  id="status"
                  name="status"
                  placeholder="Enter Status"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CButton type="submit" color="primary">Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;
