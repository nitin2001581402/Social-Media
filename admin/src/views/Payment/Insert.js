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
  CRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const PaymentInsert = () => {
  let nav = useNavigate();
  const [payment, setPayment] = useState({
    packageId: '',
    userId: '',
    bookingId: '',
    paymentType: '',
    amount: '',
    status: '',
  });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5005/api/payment/insert", payment)
      .then((res) => {
        if (res.data.success) {
          alert("Payment added successfully");
          nav('/payments');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the payment.");
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Payment</strong>
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
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="bookingId">Booking ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="bookingId"
                  name="bookingId"
                  placeholder="Enter Booking ID"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="paymentType">Payment Type</CFormLabel>
                <CFormInput
                  type="text"
                  id="paymentType"
                  name="paymentType"
                  placeholder="Enter Payment Type"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
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
              <CButton type="submit" color="primary">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PaymentInsert;
