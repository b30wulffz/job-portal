const mongoose = require('mongoose')

let schema = new mongoose.Schema(
	{
		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		refererId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		referalCode: {
			type: String,
			required: true,
		},
	},
	{ collation: { locale: 'en' } }
)

module.exports = mongoose.model('referals', schema)
