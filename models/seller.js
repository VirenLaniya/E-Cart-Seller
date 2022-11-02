const getDB = require('../services/connect_database').getDB;

module.exports = class Seller {

    // When Seller object will created it will takes some arguments which is the fields for sellers database
    constructor(name, business_name, mobile, email, password) {
        this.name = name;
        this.business_name = business_name;
        this.mobile = mobile;
        this.email = email;
        this.password = password;
    }

    // Insert 'this' with all included fields
    save() {
        return getDB().collection('sellers').insertOne(this);
    }

    // Static methods
    static findByEmail(email) {
        return getDB().collection('sellers').findOne({ email: email });
    }
}