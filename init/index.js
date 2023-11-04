const mongoose = require ("mongoose");
const initData = require ("./data.js");
const Listing = require("/Users/rehbarkhan/Documents/codebox/major project/models/listing.js")

const MONGO_URL='mongodb://127.0.0.1:27017/ghumo'

main().then(()=>{
    console.log("connected to dbs")
    
    })
    .catch(err=>{
        console.log(err)
})
async function main(){
   await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Test datat is successfully added!");
};
initDB();