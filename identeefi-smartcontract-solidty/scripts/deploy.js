const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const productContractFactory = await hre.ethers.getContractFactory("Identeefi");
  const productContract = await productContractFactory.deploy();
  await productContract.deployed();

  console.log("Identeefi address: ", productContract.address);



};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();