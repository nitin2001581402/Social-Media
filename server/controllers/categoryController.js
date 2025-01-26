
import env from 'dotenv'
import CategorySchema from '../models/category.js'
env.config()


export const Insert = async (req, res) => {
    try {
        const { name } = req.body;
        const check = await CategorySchema.findOne({ name: new RegExp(`^${name}$`, 'i') });
        
        if (check) {
            return res.json({ success: false, message: "Category already exists" });
        } else {
            const category = new CategorySchema({ name });
            await category.save();
            return res.json({ success: true, category });
        }
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal server error");
    }
};


export const Get = async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.json({ success: true, categories })
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
        const check = await CategorySchema.findById(id);
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deleteddata = await CategorySchema.findByIdAndDelete(id)
            return res.json({ success: true, deleteddata })
        }
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
        const check = await CategorySchema.findById(id);
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
            const updateddata = await CategorySchema.findByIdAndUpdate(id, { $set: newdata }, { new: true })
            return res.json({ success: true, updateddata })
        }
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}


// module.exports = { Insert, Get, Delete, Update }