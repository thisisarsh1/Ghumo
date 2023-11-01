const mongoose =require ("mongoose");
const Schema = mongoose.Schema;


// const listingSchema= new Schema({
//     title :{type :String,
//         required:true
//     },
//     description:String,
//     image: {
//         default:"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg",
//     filename: String,
//     url: String,
//     set:(v)=>v===""? "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg":v
//     },
//     price: Number,
//     location:String,
//     country:String,
// })






const listingSchema = new Schema({
    title :{type :String,
           },
  description: String,
  image: {
   filename: String,
    url: String,
   }, 
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
