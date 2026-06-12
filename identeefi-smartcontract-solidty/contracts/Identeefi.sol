// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "hardhat/console.sol";
error ProductHasSameRegisterAndExpiry();
error ProductIsExpired();
contract Identeefi {
    address public owner; //admin

    struct Product {
        string name;
        string serialNumber;
        string description;
        string brand;
        string image;
        mapping(uint => ProductHistory) history;
        uint historySize;
    }

    mapping(string => Product) products;
    mapping(uint => ProductHistory) history;    

    struct ProductHistory {
        uint id;
        string actor;
        string location;
        uint256 initialize_timestamp;
        uint256 expire_timestamp;
        bool isSold;
    }

        event ProductRegistered(
        string serialNumber,
        string name,
        string brand,
        string description,
        string image,
        string actor,
        string location,
        uint256 expire_timestamp
    );

    event ProductHistoryAdded(
        string serialNumber,
        uint id,
        string actor,
        string location,
        uint256 initialize_timestamp,
        uint256 expire_timestamp,
        bool isSold
    );

    //manufacurer invoke
    function registerProduct(string memory _name, string memory _brand, string memory _serialNumber, string memory _description, string memory _image,  string memory _actor, string memory _location, uint256 _expire_timestamp) public {

        if (block.timestamp >= (block.timestamp + _expire_timestamp)){
            revert ProductHasSameRegisterAndExpiry();
        }
        Product storage p = products[_serialNumber];

        p.name = _name;
        p.brand = _brand;
        p.serialNumber = _serialNumber;
        p.description = _description;
        p.image = _image;
        p.historySize = 0;


        addProductHistory(_serialNumber,_actor, _location, block.timestamp ,_expire_timestamp, false);
        emit ProductRegistered(
            _serialNumber,
            _name,
            _brand,
            _description,
            _image,
            _actor,
            _location,
            _expire_timestamp
        );

    }
   //retialer will invoke
    function addProductHistory(string memory _serialNumber, string memory _actor, string memory _location, uint256  _initialize_timestamp, uint256 _expire_timestamp, bool _isSold) public {
        Product storage p = products[_serialNumber];
        p.historySize++;
        p.history[p.historySize] = ProductHistory(p.historySize, _actor, _location, _initialize_timestamp, _expire_timestamp, _isSold);

        emit ProductHistoryAdded(
            _serialNumber,
            p.historySize,
            _actor,
            _location,
            _initialize_timestamp,
            _expire_timestamp,
            _isSold
        );

        console.log("i1: %s", p.historySize);
        console.log("Product History added: %s", p.history[p.historySize].actor);
        console.log("Product : %s", p.name);
    }

    function getProduct(string memory _serialNumber) public view returns (string memory, string memory, string memory, string memory, string memory, ProductHistory[] memory) {
        ProductHistory[] memory pHistory = new ProductHistory[](products[_serialNumber].historySize);
        for (uint i = 0; i < products[_serialNumber].historySize ; i++) {
            pHistory[i] = products[_serialNumber].history[i+1]; 
        if (block.timestamp < pHistory[i].expire_timestamp) {
            revert ProductIsExpired();
          }

        }
        return (products[_serialNumber].serialNumber, products[_serialNumber].name, products[_serialNumber].brand,products[_serialNumber].description, products[_serialNumber].image, pHistory);
    }

}
    