const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('pg');
const { create } = require('domain');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres"
});
client.connect();

// const csvFilePath = '/home/muhammad/Desktop/FYP/anti-postgres/anti-counterfeit-product-identification-system-using-blockchain/identeefi-postgres-database/auth.csv';

// const parseCSVAndInsertData = () => {
//     const results = [];

//     fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', async () => {
//             try {
//                 for (const row of results) {
//                     await insertData(row);
//                 }

//                 console.log('Data inserted successfully');
//             } catch (error) {
//                 console.error('Error inserting data:', error);
//             } finally {
//                 client.end();
//             }
//         });
// };

// const insertData = async (row) => {
//     const { username, password, role } = row;

//     await client.query(`
//         INSERT INTO auth (username, password, role)
//         VALUES ($1, $2, $3)
//     `, [username, password, role]);
// };

// parseCSVAndInsertData();

//account
async function createAccount(username, password, role){
    await client.query(`INSERT INTO auth (username,password,role) VALUES($1, $2, $3)`,[username,password,role],(err, res)=>{
  if(err){
    console.log(err.message)
  }else{
    console.log("Accounts inserted successfully!!")
  }

    })
}
createAccount("admin","admin","admin");
createAccount("supplierhoon","supp","supplier");
createAccount("manu","manu","manufacturer");
createAccount("retailer","retailer","retailer");




async function getAccount(){
    const data = await client.query("Select * from auth");
console.log("account: ",data.rows); 
}
getAccount();


//profile
async function createProfile(username, name , description, website, location, image, role){
   await client.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [username, name, description, website, location, image, role], (err, res)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Profiles insert successfully!!');
            }
        })
}
createProfile("manu","Manu Group","'Manu Group is one of the biggest manufacturer company in Malaysia, covering the majority of the luxury industry'","www.manu.com.my","'Kuala Lumpur, Malaysia'",null,"manufacturer")
createProfile("supp","CK Supplier","'CK supplier supplies a myriad of luxury items and has a long term contract with Chanel, LV, Dior, etc.'","www.cksupp.com.my","'Bangsar South, Malaysia'",null,"supplier")
createProfile("retailer","RE retailer","'RE retailer is the only authorized retailer to resell certain goods from certain luxury brands only, namely Chloe, Hermes, Chanel and more'","www.reretailer.com.my","'Kuala Lumpur, Malaysia'",null,"retailer")


async function getProfile(){
    const data = await client.query("Select * from profile");
    console.log("profile: ",data.rows);
}
getProfile();


//product
async function addProduct(serialNumber, name , brand){
  await  client.query('INSERT INTO product (serialNumber, name, brand) VALUES ($1, $2, $3)', 
        [serialNumber, name, brand], (err, res)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Data insert successful');
            }
        })

}

addProduct( "c12345","Handbag","Classic");
addProduct( "c1235","Bag","Flap");
addProduct( "c32145","Bag","Mini Flap");
addProduct("cq2145","Bag","Mini Flap");
addProduct("cq2145","Bag","Mini Cart",);




async function getProduct(){
    const data = await client.query("Select * from product");
    console.log("product: ", data.rows)
}
getProduct();