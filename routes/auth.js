const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const { authValidations } = require("../messages/validation-messages");
const bcrypt = require('bcryptjs');
const authMiddleware = require("../middleware/auth");

const User = require('../models/User');

// @route   GET api/auth
// @desc    get logged in user
// @access  PRIVATE
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @route   POST api/auth
// @desc   auth user and get token
// @access  PUBLIC
router.post('/', [
    check("email", authValidations.email).isEmail(),
    check("password", authValidations.password).exists()
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: authValidations.inValidCredentials });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: authValidations.inValidCredentials });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    });

module.exports = router;