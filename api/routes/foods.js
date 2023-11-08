const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");

const Food = require("../models/food.js");


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************


router.get('/get-user-foods', checkAuth,async (req, res) => {

    try {

        const userId = req.userData._id;

        const data = await Food.find({ userId: userId });

        const response = {
            status: "success",
            data: data
        }

        return res.status(200).json(response);

    } catch (error) {

        console.log(error)

        const response = {
            status: "error",
            error: error
        }

        return res.status(500).json(response);

    }

});


router.post('/load-user-food', checkAuth, async (req, res) => {

    try {

        const userId = req.userData._id;
        const userFood = req.body;

        userFood.userId = userId;

        const comida = await Food.findOne({ userId: userId }).sort('-foodId');
        const maxId = comida.foodId+1;
        userFood.foodId = maxId;
        
        const result = await Food.create(userFood);

        const response = {
            status: "success",
            data:result
        }

        return res.status(200).json(response);

    } catch (error) {

        console.log(error)

        const response = {
            status: "error",
            error: error
        }

        return res.status(500).json(response);

    }

});

module.exports = router;
