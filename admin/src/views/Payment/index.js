import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5005/api/payment/get")
      .then((res) => {
        if (res.data.success) {
          setPayments(res.data.payment);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while fetching payments.");
      });
  }, [change]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5005/api/payment/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Payment deleted successfully");
          setChange(!change);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const nav = useNavigate();

  const Edit = ({ payment }) => {
    const [visible, setVisible] = useState(false);
    const [editPayment, setEditPayment] = useState(payment
    //   {
    //   packageId: payment.packageId,
    //   userId: payment.userId,
    //   bookingId: payment.bookingId,
    //   paymentType: payment.paymentType,
    //   amount: payment.amount,
    //   status: payment.status,
    // }
  );

    const handleChange = (e) => setEditPayment({ ...editPayment, [e.target.name]: e.target.value });

    const handleEdit = () => {
      setChange(true)
      axios.put(`http://localhost:5005/api/payment/update/${payment._id}`, { name: editPayment._id})
        .then((res) => {
          if (res.data.success) {
            alert("Payment updated successfully");
            // setChange(!change);
          } else {
            alert(res.data.message);
          }
          setVisible(false);
          setChange(false)
        })
        .catch((err) => {
          alert(err.message);
          setVisible(false);
        });
    };

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="packageId">Package ID</CFormLabel>
                <CFormInput
                  value={editPayment.packageId}
                  type="text"
                  name="packageId"
                  id="packageId"
                  placeholder="Enter Package ID"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="userId">User ID</CFormLabel>
                <CFormInput
                  value={editPayment.userId}
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="Enter User ID"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="bookingId">Booking ID</CFormLabel>
                <CFormInput
                  value={editPayment.bookingId}
                  type="text"
                  name="bookingId"
                  id="bookingId"
                  placeholder="Enter Booking ID"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="paymentType">Payment Type</CFormLabel>
                <CFormInput
                  value={editPayment.paymentType}
                  type="text"
                  name="paymentType"
                  id="paymentType"
                  placeholder="Enter Payment Type"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput
                  value={editPayment.amount}
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="status">Status</CFormLabel>
                <CFormInput
                  value={editPayment.status}
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
            <CButton color="primary" onClick={handleEdit}>Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payments</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Package ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Booking ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Payment Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {payments.map((payment, index) => (
                  <CTableRow key={payment._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{payment.packageId}</CTableDataCell>
                    <CTableDataCell>{payment.userId}</CTableDataCell>
                    <CTableDataCell>{payment.bookingId}</CTableDataCell>
                    <CTableDataCell>{payment.paymentType}</CTableDataCell>
                    <CTableDataCell>{payment.amount}</CTableDataCell>
                    <CTableDataCell>{payment.status}</CTableDataCell>
                    <CTableDataCell>{new Date(payment.date).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>
                      <Edit payment={payment} />
                      <CButton color="danger" onClick={() => handleDelete(payment._id)}>Delete</CButton>
                    </CTableDataCell>
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

export default Payments;
