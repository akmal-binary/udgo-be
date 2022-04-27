const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const highscore_schema = new Schema({
    user: {
        type: String,
        required: true,
    },
    highscore: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Highscore = Mongoose.model('Highscore', highscore_schema);

module.exports = Highscore;