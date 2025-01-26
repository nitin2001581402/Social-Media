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

const UserInsert = () => {
  let nav = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('Active'); // Default status
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5005/api/user/insert", {
      name,
      phone,
      email,
      password,
      age,
      gender,
      status,
      image
    })
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        alert("User added successfully");
        nav('/User'); // Navigate to user list page after successful insertion
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.error("Error inserting user:", err);
      alert("Failed to add user. Please try again later.");
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel>Name</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Password</CFormLabel>
                <CFormInput
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Age</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Gender</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Image URL</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Status</CFormLabel>
                <CFormInput
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </CFormInput>
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

export default UserInsert;
