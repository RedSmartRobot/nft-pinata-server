const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET = process.env.PINATA_SECRET;

app.post("/upload", async (req,res)=>{

    try{

        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            req.body,
            {
                headers:{
                    "Content-Type":"application/json",
                    pinata_api_key:PINATA_API_KEY,
                    pinata_secret_api_key:PINATA_SECRET
                }
            }
        );

        const cid=response.data.IpfsHash;

        res.json({
            ipfsUrl:`ipfs://${cid}`
        });

    }catch(e){

        res.status(500).send("upload failed");

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server running");
});
