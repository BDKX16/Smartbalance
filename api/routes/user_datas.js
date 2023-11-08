const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");

const Data = require("../models/user_data.js");
const Device = require("../models/device.js");

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************




router.get('/get-data', async (req, res) => {

    try {

        const userId = req.userData._id;
        const timeAgo = req.query.timeAgo;
        const dId = req.query.dId;
        const variable = req.query.variable;

        const timeAgoMs = Date.now() - (timeAgo * 24 * 60 * 60 * 60 * 1000);

        const data = await Data.find({ userId: userId, "time": { $gt: timeAgoMs } }).sort({ "time": 1 });

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

        return res.json(response);

    }

});



router.post('/load-data', async (req, res) => {

    try {

        const dId = req.body.dId;
        const foodId = req.body.foodId;
        const grams = req.body.grams;

        const device = await Device.findOne({ dId: dId });
        console.log(device)

        if (!device) {
            return res.status(500);
        }


        let newData = {
            userId: device.dId,
            grams: grams,
            foodId: foodId,
            time: Date.now(),
        }

        await Data.create(newData);


        return res.status(200)

    } catch (error) {

        console.log(error)

        const response = {
            status: "error",
            error: error
        }

        return res.json(response);

    }

});


