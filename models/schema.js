var mongoose = require("mongoose");

studentSchema = mongoose.Schema({
    
        firstname:{
            type     : String,
            required : true,
        },
        lastname:{
            type     : String,
        },
        rno:{
            type     : String,
            required : true,
            unique   : true,
        },
        email:{
            type     : String,
            required : true,
            unique   : true,
        },
        password:{
            type     : String,
            required : true,
        }

});
    
teacherSchema = mongoose.Schema({
    
    firstname:{
        type     : String,
        required : true,
    },
    lastname:{
        type     : String,
    },
    subject:{
        type     : String,
        required : true,
        unique   : true,
    },
    email:{
        type     : String,
        required : true,
        unique   : true,
    },
    password:{
        type     : String,
        required : true,
    }

});

marksSchema = mongoose.Schema({
    
    rno:{
        type     : String,
        required : true,
        unique   : true
    },
    telugu:{
        type     : Number
    },
    hindi:{
        type     : Number
    },
    english:{
        type     : Number
    },
    maths:{
        type     : Number
    },
    science:{
        type     : Number
    },
    social:{
        type     : Number
    }

});

var Student =mongoose.model('Student',studentSchema);
var Teacher =mongoose.model('Teacher',teacherSchema);
var Marks   =mongoose.model('Marks',marksSchema);
module.exports ={
        Student : Student,
        Teacher : Teacher,
        Marks   : Marks
    };
