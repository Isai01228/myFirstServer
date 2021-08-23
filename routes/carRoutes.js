const express = require('express');
const app = express();
const { newCarController, getCarsByUserController, updateCarByIDController, deleteCarByIDController } = require(`../controllers/carController`);

const { tokenVerify } = require('../middlewares/tokenVerify');

app.post('/newCar', tokenVerify, newCarController)

app.get('/getCarsByUser', tokenVerify, getCarsByUserController)

app.put(`/updateCarByID/:id`, tokenVerify, updateCarByIDController)

app.delete(`/deleteCarByID/:id`, tokenVerify, deleteCarByIDController)

module.exports = app