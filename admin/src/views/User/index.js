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
} from '@coreui/react';
import { BASE_URL } from '../../global';
import moment from 'moment'

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/get`);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/delete/${id}`);
      if (response.data.success) {
        alert("User deleted successfully");
        fetchUsers(); // Refresh the user list
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again later.");
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>First Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Occupation</CTableHeaderCell>
                 
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user, index) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{user.firstName}</CTableDataCell>
                    <CTableDataCell>{user.lastName}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.location}</CTableDataCell>
                    <CTableDataCell>{user.occupation}</CTableDataCell>
                    {/* <CTableDataCell>{user.age}</CTableDataCell>
                    <CTableDataCell>{user.gender}</CTableDataCell>
                    <CTableDataCell>{user.status}</CTableDataCell> */}
                    <CTableDataCell>{moment(user.createdAt).format('L')}</CTableDataCell>
                    <CTableDataCell>
                      {/* <CButton color='primary'>Edit</CButton>{' '} */}
                      <CButton color='danger' onClick={() => handleDelete(user._id)}>Delete</CButton>
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

export default Users;
