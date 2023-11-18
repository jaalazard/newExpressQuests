const validateUser = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const errors = [];
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

    if (typeof firstname !== "string" && firstname.length < 1) {
        errors.push("firstname must be a string of a least one character");
    }   
    if (typeof lastname !== "string" && lastname.length < 1) {
        errors.push("lastname must be a string of a least one character");
    }
    if (!emailRegex.test(email)) {
        errors.push("this should be an email");
    }
    if (typeof password !== "string" && password.length < 6) {
        errors.push("password must be a string of a least six character");
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = validateUser;