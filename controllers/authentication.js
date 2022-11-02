// Bcryptjs used for Generating hashed string
const bcrypt = require('bcryptjs');

const Seller = require('../models/seller');

exports.getSignup = (req, res) => {
    res.render('authentication/signup.ejs', {
        pageTitle: "Sign Up"
    });
}

exports.getLogin = (req, res) => {
    res.render('authentication/login.ejs', {
        pageTitle: "Login"
    });
}

exports.postSignup = (req, res) => {
    // Parsing data from signup form using body-parser
    const name = req.body.name;
    const bus_name = req.body.bname;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const password = req.body.password;

    Seller.findByEmail(email)
        .then(user => {
            if (user) {
                console.log("Email is already registered!");
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                // .hash(password string, salt: number of round for hash (12 is most secure currently)) And it will return the promise
                .then(hashedPassword => {
                    const seller = new Seller(name, bus_name, mobile, email, hashedPassword);
                    seller.save();
                })
                .then(result => {
                    console.log("You have successfully signed up!");
                    res.redirect('/login');
                })
                .catch(err => { throw err });
        })
        .catch(err => { throw err; });
}

exports.postLogin = (req, res) => {
    // Parsing data from signup form using body-parser
    const email = req.body.email;
    const password = req.body.password;

    Seller.findByEmail(email)
        .then(seller => {
            if (!seller) {
                console.log("Email is not registered!");
                return res.redirect('/login');
            }
            bcrypt.compare(password, seller.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log("You have logged in!");
                        res.redirect('/');
                    }
                    else {
                        console.log("Invalid credentials!");
                        res.redirect('/login');
                    }
                })
                .catch(err => { throw err; });
        })
        .catch(err => { throw err; });
}