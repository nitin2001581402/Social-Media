import React, { useState } from 'react';
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
  CFormTextarea,
  CRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const InsertReview = () => {
  const [reviewData, setReviewData] = useState({
    packageId: '', // Set packageId as per your requirement
    userId: '', // Set userId as per your requirement
    reviews: '',
    ratings: 0,
    status: 'Pending',
  });

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5005/api/review/insert", reviewData)
      .then((res) => {
        console.log(res.data); // Log response for debugging
        if (res.data.success) {
          alert("Review inserted successfully");
          nav('/reviews'); // Navigate to review list or another page
        } else {
          alert("Failed to insert review: " + res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error inserting review:", err);
        alert("An error occurred while inserting the review. Please try again.");
      });
  };

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Review</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="packageId">Package ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="packageId"
                  name="packageId"
                  placeholder="Enter Package ID"
                  value={reviewData.packageId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="userId">User ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Enter User ID"
                  value={reviewData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="reviews">Reviews</CFormLabel>
                <CFormTextarea
                  id="reviews"
                  name="reviews"
                  placeholder="Enter Reviews"
                  value={reviewData.reviews}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ratings">Ratings</CFormLabel>
                <CFormInput
                  type="number"
                  id="ratings"
                  name="ratings"
                  placeholder="Enter Ratings"
                  value={reviewData.ratings}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CButton type='submit' color="primary">Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default InsertReview;
