const Car = require(`../models/carsModel`)

exports.newCarController = async(req, res) => {
    const { _id } = req.user
    const { model, color, year, active } = req.body;

    const newCar = new Car({
        model,
        color,
        year,
        active,
        owner: _id
    })
    try {
        const carCreated = await newCar.save();
        res.status(200).json({ ok: true, carCreated })
    } catch (error) {
        res.status(404).json({ ok: false, error })
    }
}

exports.getCarsByUserController = async(req, res) => {
    const { _id } = req.user
    try {
        const carsByUser = await Car.find({ owner: _id })
            .populate('User', 'email')
            .exec();
        res.status(200).json({ ok: true, carsByUser })
    } catch (error) {
        res.status(404).json({ ok: false, error })
    }
}

exports.updateCarByIDController = async(req, res) => {
    const { id } = req.params
    const { color, active } = req.body
    try {
        const updateCar = await Car.findByIdAndUpdate(id, { color, active }, { new: true })
        res.status(200).json({ ok: true, updateCar })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.deleteCarByIDController = async(req, res) => {
    const { id } = req.params
    try {
        const cardeleted = await Car.findOneAndDelete(id)
        res.status(200).json({ ok: true, cardeleted, message: `Car deleted successfully` })
    } catch (error) {
        res.status(400).json({ error })
    }
}