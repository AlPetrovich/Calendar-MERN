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
        ref: 'User', //a que modelo se refiere
        required: true
    }
    
});

//modificar response 
EventSchema.method('toJSON', function(){
    //extraer version y id, todo lo demas no
    const {__v, _id, ...object} = this.toObject(); //referencia a todo el objeto que se serializa (id-title-start-end)
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema);