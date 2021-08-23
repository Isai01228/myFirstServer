const User = require(`../models/userModel`)

exports.createUserController = async(req, res) => {
    const { name, email, password, age } = req.body
    User.register({ name, email, age }, password, (err, user) => {
        if (err) return res.status(400).json({ ok: false, err })

        res.status(200).json({ ok: true, user })
    })
}

exports.getAllUserController = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ ok: true, usuarios: users })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.getUserByIDController = async(req, res) => {
    const { _id } = req.user
    try {
        const user = await User.findById(_id)
        res.status(200).json({ ok: true, user })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.updateUserController = async(req, res) => {
    const { _id } = req.user
    const { name, age } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, { name, age }, { new: true })
        res.status(200).json({ ok: true, updatedUser })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.deleteUserController = async(req, res) => {
    const { _id } = req.user
    try {
        const deletedUser = await User.findByIdAndDelete(_id)
        res.status(200).json({ ok: true, deletedUser, message: `User deleted successfully` })
    } catch (error) {
        res.status(404).json({ error })
    }
}