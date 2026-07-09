import axios from "axios"



async function main(){
   
   
   for (let i = 30; i <= 194; i+=30) {
    
     const resp = await axios.get(`https://dummyjson.com/products?skip=${i}`);
     // console.log(resp.data)
     const product = resp.data.products.map((p) => ({
       id: p.id,
       price: p.price * 2.7,
       tags: p.tags,
       thumbnail: p.thumbnail,
     }));
     console.log(product);
   }
  
}
main()