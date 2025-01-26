// const AdminSchema = require('../models/admin')
import AdminSchema from '../models/admin.js'
// const bcryptjs = require('bcryptjs')
import bcryptjs from 'bcryptjs'
// const jwt = require("jsonwebtoken")
import jwt from 'jsonwebtoken'
// const env = require("dotenv")
import env from 'dotenv'
env.config()


export const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        const check = await AdminSchema.find({ email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            const secPass = await bcryptjs.hash(password, salt)

            const admin = await AdminSchema({ name, phone, email, password: secPass })
            await admin.save()
            return res.json({ success: true, savedAdmin: admin })
        }
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}

export const Get = async (req, res) => {
    try {
        const user = await AdminSchema.find();
        res.json({ success: true, user })
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }

}

export const Delete = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        const check = await AdminSchema.findById(id);
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deleteddata = await AdminSchema.findByIdAndDelete(id)
            return res.json({ success: true, deleteddata })
        }

        // res.json({success:true,check})
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}

export const Update = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        const check = await AdminSchema.findById(id);
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {

            const { name, phone, email, password } = req.body

            const newdata = {}
            if (name) { newdata.name = name }
            if (phone) { newdata.phone = phone }
            if (email) { newdata.email = email }
            if (password) {
                const salt = await bcryptjs.genSalt(10)
                const secPass = await bcryptjs.hash(password, salt)
                newdata.password = secPass
            }
            const updateddata = await AdminSchema.findByIdAndUpdate(id, { $set: newdata }, { new: true })
            return res.json({ success: true, updateddata })
        }
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const check = await AdminSchema.findOne({ email })
        if (check) {
            const passwordcompare = await bcryptjs.compare(password, check.password);
            if (!passwordcompare) {
                return res.json({ success: false, message: "incorrect email or password" })
            }
            else {
                const data = check.id
                const token = await jwt.sign(data, process.env.JWT_SECRET)
                return res.json({ success: true, message: "Login successfull", token })
            }
        }
        else {
            return res.json({ success: false, message: "incorrect email or password" })
        }
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}

// module.exports = { Register, Get, Delete, Update, Login }