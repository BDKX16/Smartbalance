const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");

const Food = require( "../models/food.js");


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************


router.get('/get-user-foods', async (req, res) => {

    try {

        const userId = req.userData._id;
        const queryUserId = req.query.userId;

        const data = await Food.find({ userId: queryUserId });

        const response = {
            status: "success",
            data: data
        }

        return res.json(response)

    } catch (error) {

        console.log(error)

        const response = {
            status: "error",
            error: error
        }

        return res.status(500).json(response);

    }

});


router.post('/load-user-food', async (req, res) => {

    try {

        const userId = req.userData._id;
        const userFood = req.body.userFood;

        const data = await Food.create(userFood);

        return res.status(200)

    } catch (error) {

        console.log(error)

        const response = {
            status: "error",
            error: error
        }

        return res.status(500).json(response);

    }

});
  