const { romanize } = require('./../services')

const controller = async (req, res, next) => {
	try {
		if (req.body.data) {
			if (req.body.data >= 1 && req.body.data <= 100) {
				res.setHeader('Content-Type', 'text/plain');

				//We're sending back the romanian number
				res.send(romanize(req.body.data));
			} else {
				return res.status(401).send({
					error: `${req.body.data} is not in the 1-100 range`
				})
			}
		} else {
			return res.status(400).send({
				error: "Data undefined or incorrect"
			})
		}
	} catch (error) {
		res.status(402).send({
			error: error.message
		})
	}
};

module.exports = {
    controller
}