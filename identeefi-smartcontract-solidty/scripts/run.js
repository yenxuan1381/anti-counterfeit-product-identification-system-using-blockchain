const {time} = require("@nomicfoundation/hardhat-network-helpers")
const main = async () => {
    const productContractFactory = await hre.ethers.getContractFactory("Identeefi");
    const productContract = await productContractFactory.deploy();
    await productContract.deployed();
    console.log("Contract deployed to:", productContract.address);
   const now =  Math.floor(new Date().getTime()/1000);
   const expireTime = Math.floor(now + 86400);
   console.log(now,expireTime)
    const productTxn = await productContract.registerProduct("name", "brand", "001", "description", "image",  "Manu Group", "loc", expireTime);

    await productTxn.wait();
    console.log("Product registered:", productTxn.hash);

    const historyTxn = await productContract.addProductHistory("001", "Manu Group", "loc", now,expireTime, false);
    await historyTxn.wait();
    console.log("Product history added:", historyTxn.hash);

    // const history2Txn = await productContract.addProductHistory("001", "Supplier Group", "sloc", "12345678", false);
    // await history2Txn.wait();
    // console.log("Product history added:", history2Txn.hash);
    // time.increase(86400);
    const prod = await productContract.getProduct("001");
    console.log("Product:", prod);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();