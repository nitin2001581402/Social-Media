
import env from 'dotenv'
import MessageSchema from '../models/message.js'
env.config()


export const Insert = async (req, res) => {
    try {
        const { message, sender_id, receiver_id } = req.body;
        const newMessage = new MessageSchema({ message, sender_id, receiver_id });
        await newMessage.save();

        const messages = await MessageSchema.find({
            $or: [
                { sender_id: sender_id },
                { receiver_id: sender_id }
            ]
        }).populate(["sender_id", "receiver_id"]);
        return res.json({ success: true, messages });
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal server error");
    }
};


export const Get = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.params;

        if (!sender_id || !receiver_id) {
            return res.status(400).json({ success: false, message: "sender_id and receiver_id are required" });
        }

        const messages = await MessageSchema.find({
            $or: [
                { sender_id: sender_id, receiver_id: receiver_id },
                { sender_id: receiver_id, receiver_id: sender_id }
            ]
        }).populate(["sender_id", "receiver_id"]);

        res.json({ success: true, messages });
    } catch (err) {
        console.error("error:", err.message);
        res.status(500).send("Internal server error");
    }
};



export const Delete = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        const check = await MessageSchema.findById(id);
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deleteddata = await MessageSchema.findByIdAndDelete(id)
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
        const check = await MessageSchema.findById(id);
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
            const updateddata = await MessageSchema.findByIdAndUpdate(id, { $set: newdata }, { new: true })
            return res.json({ success: true, updateddata })
        }
    }
    catch (err) {
        console.log("error:" + err.message)
        res.status(500).send("Internal server error")
    }
}


// module.exports = { Insert, Get, Delete, Update }