const express= require("express");
const app= express();
const mongoose = require("mongoose");
const port=8080;
const Listing =require("./models/listing.js");
const path =require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));



main()
.then(()=>{
    console.log("connected to Db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
app.get("/",(req,res)=>{
    res.send("hi ,i am root");
});
// index route
app.get("/listings", async(req,res)=>{
   let allListings= await Listing.find({}) ;
   res.render("index.ejs",{allListings});
    
    });
    //  new route
app.get("new.ejs",(req,res)=>{
    res.render("listings/new.ejs");
});
// show route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});






// app.get("/testlisting",async(req,res)=>{
//     let sampleListing =new Listing({
//         tittle:"My new villa",
//         description:"by beach",
//         price:1200,
//         lication:"calangute,Goa",
//         country:"India"

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucessful testing");
// });

app.listen(port,()=>{
    console.log(`app is listening on the port ${port}`);
});

