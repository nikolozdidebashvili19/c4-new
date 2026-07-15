const express = require('express')
const app = express()
const fs = require("fs/promises");
app.use(express.json());
app.get('/products' ,async (req,res)=> {
    const products = await fs.readFile('products.json' , "utf-8")
    const parsedProducts = JSON.parse(products)
    res.json(parsedProducts)
})
app.post('/products', async(req,res)=> {
        if (!req.body.title || !req.body.price || req.body.isNew === undefined) {
       return res.status(400).json({
            success: false,
            message: "title price or isNew is required",
        });
        }
        const products = await fs.readFile('products.json' , "utf-8")
        const parsedProducts = JSON.parse(products)
        const lastId = parsedProducts.length
        const newProduct = {
            title:req.body.title , 
            price: req.body.price , 
            isNew: req.body.isNew , 
            id:lastId+1
        }
     parsedProducts.push(newProduct);
        fs.writeFile("products.json" , JSON.stringify(parsedProducts))
         res.status(201).json({
           success: true,
           product: newProduct,
         });
    }) 

   app.delete("/products/:id", async (req, res) => {
     const products = await fs.readFile("products.json", "utf-8");
     const parsedProducts = JSON.parse(products);

     const id = Number(req.params.id);

     const product = parsedProducts.find((p) => p.id === id);

     if (!product) {
       return res.status(404).json({
         success: false,
         message: "Product not found",
       });
     } else {
      
       parsedProducts.splice(
         parsedProducts.findIndex((p) => p.id === id),
         1,
       );

       await fs.writeFile("products.json", JSON.stringify(parsedProducts));

       return res.status(200).json({
         message: `successfully deleted product with id: ${id}`,
       });
     }
   });

   app.put('/products/:id' ,async (req,res)=> {
    const products = await fs.readFile('products.json' , "utf-8")
        const parsedProducts = JSON.parse(products)
       const toUpdate = parsedProducts.find(
         (p) => p.id === Number(req.params.id),
       ); 
       if (!toUpdate) {
         return res.status(404).json({
           message: "Product not found",
         });
       }
      toUpdate.title = req.body.title;
      toUpdate.price = req.body.price;
      toUpdate.isNew = req.body.isNew;
        await fs.writeFile("products.json", JSON.stringify(parsedProducts));
        return res.status(200).json({
            message: "updated succesfully"
        })
   })
app.listen(3000 , ()=> {
    console.log("servr runnning on http://localhost:3000/");
})