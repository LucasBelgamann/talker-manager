const validationLogin = (req, res, next) => {
    const userLogin = req.body;
    const regexValidation = /\S+@\w+.\w+/i;
    if (!userLogin.email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!regexValidation.test(userLogin.email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!userLogin.password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (userLogin.password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = validationLogin;