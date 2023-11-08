const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");

const Device = require( "../models/device.js");


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************