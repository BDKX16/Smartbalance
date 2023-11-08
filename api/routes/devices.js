const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");

const Device = require("../models/device.js");
const Data = require("../models/user_data.js");


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************




//GET DEVICES
router.get("/device", async (req, res) => {
    try {
        const userId = req.userData._id;

        //get devices
        var devices = await Device.find({ userId: userId });

        //mongoose array to js array
        devices = JSON.parse(JSON.stringify(devices));


        const response = {
            status: "success",
            data: devices
        };

        res.json(response);
    } catch (error) {
        console.log("ERROR GETTING DEVICES");
        console.log(error);

        const response = {
            status: "error",
            error: error
        };

        return res.status(500).json(response);
    }
});

//NEW DEVICE
router.post("/device", async (req, res) => {
    try {
        const userId = req.userData._id;

        var newDevice = req.body.newDevice;

        var devices = await Device.find({ dId: newDevice.dId });

        if (devices.length == 0) {
            const response = {
                status: "error",
                message: "Invalid dId"
            };

            return res.status(401).json(response);
        }


        await Device.updateOne({ dId: newDevice.dId }, { userId: userId, name: newDevice.name });

        const response = {
            status: "success"
        };

        return res.json(response);
    } catch (error) {
        console.log("ERROR CREATING NEW DEVICE");
        console.log(error);

        const response = {
            status: "error",
            error: error,
        };

        return res.status(500).json(response);
    }
});

//DELETE DEVICE
router.delete("/device", checkAuth, async (req, res) => {
    try {
        const userId = req.userData._id;
        const dId = req.query.dId;

        //deleting device
        const result = await Device.deleteOne({ userId: userId, dId: dId });

        //devices after deletion
        const devices = await Device.find({ userId: userId });

        const response = {
            status: "success",
            data: result
        };

        return res.json(response);
    } catch (error) {
        console.log("ERROR DELETING DEVICE");
        console.log(error);

        const response = {
            status: "error",
            error: error
        };

        return res.status(500).json(response);
    }
});


//**********************
//**** FUNCTIONS *******
//**********************



async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = router;
