import React, { useState } from 'react'
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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../global'

const FormControl = () => {
    let nav = useNavigate()
    const [category,setCategory]=useState("")
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}/categories/insert`,{name:category})
        .then((res)=>{
            console.log(res)
            if(res.data.success){
                alert("category added successfully")
                nav('/Category')
            }
            else{
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Categories</strong>
          </CCardHeader>
          <CCardBody>
            
              <CForm onSubmit={handleSubmit}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Category Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Enter Category Name"
                    onChange={(e)=>setCategory(e.target.value)}
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
  )
}

export default FormControl
