const { expect } = require("chai");
const { poll } = require("ethers/lib/utils");
const { waffle,ethers } = require("hardhat");
const { userInfo } = require("os");
const {time} =  require("@nomicfoundation/hardhat-network-helpers");
const provider = waffle.provider;
const { defaultAbiCoder, hexlify, keccak256, toUtf8Bytes, solidityPack } = require("ethers/lib/utils");

const web3 = require("web3");
const exp = require("constants");
const {ecsign} = require('ethereumjs-util');
// const { sign } = require("crypto");
// const { connect } = require("http2");



describe('Greeter', () =>{

    const [owner,accountOne,accountTwo,accountThree] = provider.getWallets();
let Gnosis;
let gnosis;
let Identeefi;
let identeefi;
console.log("hello")
    before( async () =>{
     Gnosis = await ethers.getContractFactory("GnosisSafe");
     gnosis = await Gnosis.deploy();
     await gnosis.deployed();
     console.log("Gnosis Address: ", gnosis.address);

     Identeefi = await ethers.getContractFactory("CounterField");
     identeefi =await Identeefi.deploy();
     await identeefi.deployed();
     console.log("Identeefi", identeefi.address);
     })
     it('Check owner', async () => {
        // Dummy test to ensure the before hook works correctly
        expect(await identeefi.owner()).to.be.equal(owner.address);
    });

    // it("Register a Product", async()=>{
    //     let currentTimeStamp = Math.floor(Date.now() /1000);
    //     currentTimeStamp = currentTimeStamp + 120;
    //     console.log(currentTimeStamp)
    //     await identeefi.connect(accountOne).registerProduct("123","hash123",currentTimeStamp)
    // })

    it("should approve a product", async function () {
        const serialNumber = "SN123";
        let name ="iphone x";
        let brand = "Apple";
        let description = "This is the iphone x";
        let image  ='apple.png';
        let location = "California"
        const actor = "HASH123";
        // string memory _name, string memory _brand, string memory _serialNumber, string memory _description, string memory _image,  string memory _actor, string memory _location,
        const timestamp = Math.floor(Date.now() / 1000) + 1000;
     console.log(owner.address)
        // const message = ethers.utils.solidityKeccak256(["string"], [serialNumber]);
  
        
        // Request signature from owner's wallet
        // const signature = await owner.signMessage(ethers.utils.arrayify(message));
        const DomainSeparator = keccak256(ethers.utils.defaultAbiCoder.encode(["string", "address"], ["0x01", identeefi.address]));
       console.log(DomainSeparator)
        var message = keccak256(
            defaultAbiCoder.encode(["string"], [serialNumber]),
          );
          console.log("message",message)
          var finalHash = ethers.utils.keccak256(
            solidityPack(["bytes1", "bytes1", "bytes32", "bytes32"], ["0x19", "0x01", DomainSeparator, message]),
          );
          console.log('final hash', finalHash)
        // const { v, r, s } = ethers.utils.splitSignature(signature);
        let vrs = ecsign(Buffer.from(finalHash.slice(2), "hex"), Buffer.from(owner.privateKey.slice(2), "hex"));
        // console.log('v,r,s',v.toString(),r.toString(),s.toString())
        // let sign = web3.eth.accounts.sign(finalHash, "0x6ac54510a5568448fe624e91487a52017f85412ebbfe9903c036c34891f398b5")
        // let signature = `0x${r.toString('hex')}${s.toString("hex")}${v.toString(
        //     16
        //   )}`;
        signature = `0x${vrs.r.toString('hex')}${vrs.s.toString("hex")}${vrs.v.toString(16)}`;

          console.log('signature',signature)
        await identeefi.connect(accountOne).registerProduct(name,brand,serialNumber,description,image, actor,location, timestamp,signature);
    
        // Mock signatures and owner addresses
        // const v = [27];
        // const r = [ethers.utils.randomBytes(32)];
        // const s = [ethers.utils.randomBytes(32)];
        // const owners = [owner.address];
        // const indices = [0];
    
        // await identeefi.connect(owner).apporoveProduct(serialNumber, v, r, s, owners, indices);
    console.log("product registered");
        //  [serialNumber, , , isApproved] = await identeefi.pendingProducts();
        // expect(isApproved).to.be.true;
    
        const [productSerialNumber,productHistory]= await identeefi.getProduct(serialNumber);
        // console.log(product)
        expect(productSerialNumber).to.equal(serialNumber);
        expect(productHistory.length).to.equal(1);

        let products = await identeefi.getProductTest(serialNumber);
        console.log("product registered:",products);

      });
    }

)