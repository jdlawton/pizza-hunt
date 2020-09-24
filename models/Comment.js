const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

const ReplySchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: "Please enter a reply.",
            trim: true
        },
        writtenBy: {
            type: String,
            required: "You need to provide your name.",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema (
    {
        writtenBy: {
            type: String,
            required: "You need to provide your name.",
            trim: true
        },
        commentBody: {
            type: String,
            required: "Please enter a comment.",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


//get total count of replies and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;