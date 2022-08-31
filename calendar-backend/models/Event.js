const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId, //le dice a moongose que es una referencia 
        ref: 'User' //a que modelo se refiere
    }
    
});

module.exports = model('Event', EventSchema);