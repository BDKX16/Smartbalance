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