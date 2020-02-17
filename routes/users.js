const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const { userValidations } = require("../messages/validation-messages");
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route   POST api/users
// @desc    register a user
// @access  PUBLIC
router.post('/', [
    check('name', userValidations.name).not().isEmpty(),
    check('email', userValidations.email).isEmail(),
    check('password', userValidations.password).isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({ msg: "user already exists" });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

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

        } catch (error) {
            console.error(error.msg);
            res.status(500).send("Server error");
        }
    });

module.exports = router;
