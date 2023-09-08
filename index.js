//eslint error 6
const http =require('http')
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000; 


app.use(express.json());

app.get("/convert",function(req,res){res.send("<h1>This is to convert</h1>")})
app.post('/convert', async (req, res) => {
  try { 
    const var1=req.body.fromcurrency;
    const var2=req.body.tocurrency;
    

    const conversionAPI = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${var1}/${var2}.json`;
    const response = await fetch(conversionAPI);
    const data = await response.json();
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});