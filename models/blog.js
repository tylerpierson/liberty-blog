const { model, Schema } = require('mongoose')


const blogSchema = new Schema ({
    title: String,
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = model('Blog', blogSchema)