import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
} from '@coreui/react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5005/api/review/get")
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.review);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        alert("An error occurred while fetching reviews.");
      });
  }, [change]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Reviews</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Reviews</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ratings</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reviews.map((review, index) => (
                  <CTableRow key={review._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{review.reviews}</CTableDataCell>
                    <CTableDataCell>{review.ratings}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Reviews;
