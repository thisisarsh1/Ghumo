const express = require("express")
const app =express()
const mongoose = require('mongoose');
const MONGO_URL='mongodb://127.0.0.1:27017/ghumo'
const Listing = require ('/Users/rehbarkhan/Documents/codebox/major project/models/listing.js')
const path = require("path");
const methodOverride = require ("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utlis/wrapAsync.js")
const ExpressError = require("./utlis/ExpressError.js")
main().then(()=>{
    console.log("Main is working!")
    
    })
    .catch(err=>{
        console.log(err)
})
async function main(){
   await mongoose.connect(MONGO_URL);
}

app.set("view engine",'ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname, "public")));

//home
app.get("/",wrapAsync(async(req,res)=>{
   
res.render("listings/home.ejs")
}))

//index Route!
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings =await Listing .find({});
    res.render("listings/index.ejs",{allListings})
}))
//New route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
)
//create route
app.post("/listings",wrapAsync(async (req,res,next)=>{
    if(!req.body.listing){
        throw new ExpressError(404,"Send validation Data for listing")
    }
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings")
   
}))

//edit Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}))

// update route

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})   //deconstruction    ...req.body.listing
    res.redirect(`/listings/${id}`)
}))

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    res.redirect("/listings")

}))

app.listen(8080,()=>{
    console.log("port listening is working")
});
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"))
});
app.use((err,req,res,next)=>{
    let {statusCode,message} = err;
    // res.status(statusCode).send(message)
    res.render("./listings/error.ejs",{err})
    
});
app.get("/",(req,res)=>{
res.send("http://localhost:8080/listings")
})

