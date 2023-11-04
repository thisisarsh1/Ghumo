const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        
     
            type: String,
            default: "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg",
            set: function (v) {
                return v === "" ? "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg" : v;
            
            }
    },
    price: Number,
    location: String,
    country: String,
});





// const listingSchema = new Schema({
//     title :{type :String,
//            },
//   description: String,
//   image: {
//    filename: String,
//     url: String,
    
//    }, 
//   price: Number,
//   location: String,
//   country: String,
// });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
