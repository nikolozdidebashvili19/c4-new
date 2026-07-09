    const express = require("express");
    const app = express();
    const PORT = 3000;
app.use(express.json());
    let products = [
    {
        title: "product 1",
        description: "description 1",
    },
    {
        title: "product 2",
        description: "description 2",
    },
    ];

    app.post("/products" , (req,res)=> {
        const newProduct = {
            title:req.body.title , 
            description: req.body.description
        }
        products.push(newProduct)
          console.log(products);
        res.send(newProduct);
    })

    app.get('/products' , (req,res)=> {
        res.send(products)
    })

    app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    });