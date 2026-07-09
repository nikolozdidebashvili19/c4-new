import axios from "axios"



async function main(){
    const resp = await axios.get('https://dummyjson.com/users')
    console.log(resp.data)
   
}
main()