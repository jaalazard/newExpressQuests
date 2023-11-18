const validateCocktails = (req, res, next) => {
    const { name } = req.body;
    let errors = [];
    if (typeof name !== "string" && name.length < 1) {
        errors.push("name must be a string of a least one character");
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = validateCocktails;