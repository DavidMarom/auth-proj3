const generateToken = () => Math.random().toString(36).substring(2);

module.exports = { generateToken }