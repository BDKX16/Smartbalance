const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkAuth } = require("../middlewares/authentication.js");

//models import

const User = require("../models/user.js");


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************



//LOGIN
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        var user = await User.findOne({ email: email });

        //if no email
        if (!user) {
            const response = {
                status: "error",
                error: "Invalid Credentials"
            };
            return res.status(401).json(response);
        }

        //if email and email ok
        if (bcrypt.compareSync(password, user.password)) {
            user.set("password", undefined, { strict: false });


            const token = jwt.sign({ userData: user }, process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 30
            });

            const response = {
                status: "success",
                token: token,
                userData: user
            }

            return res.json(response);
        } else {
            const response = {
                status: "error",
                error: "Invalid Credentials"
            };
            return res.status(401).json(response);
        }
    } catch (error) {
        console.log(error);
    }
});


//REGISTER
router.post("/register", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const encryptedPassword = encryptPass(password)

        const newUser = {
            name: name,
            email: email,
            password: encryptedPassword
        };

        var user = await User.create(newUser);



        user.set("password", undefined, { strict: false });


        const token = jwt.sign({ userData: user }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24 * 30
        });

        const response = {
            status: "success",
            token: token,
            userData: user
        }

        return res.status(200).json(response);



    } catch (error) {
        console.log("ERROR - REGISTER ENDPOINT");
        console.log(error);

        const response = {
            status: "error",
            error: error
        };

        console.log(response);

        return res.status(500).json(response);
    }
});



//**********************
//**** FUNCTIONS *******
//**********************


function encryptPass(newPassword) {

    return bcrypt.hashSync(newPassword, 10);

}

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;
