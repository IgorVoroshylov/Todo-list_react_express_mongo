const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
   owner: {type: Types.ObjectId, ref: 'User'},
   text: {type: String},
   completed: false,
   important: false
}, {timestamps: true})

module.exports = model('Todo', schema)