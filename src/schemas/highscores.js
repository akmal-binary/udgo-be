const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const highscore_schema = new Schema({
    rank: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Highscore = Mongoose.model('new-highscore', highscore_schema);

module.exports = Highscore;