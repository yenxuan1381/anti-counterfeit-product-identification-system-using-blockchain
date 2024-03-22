# Anti-Counterfeit Product Identification System Using Blockchain

The Anti-Counterfeit Product Identification System Using Blockchain is an innovative solution that uses blockchain technology to combat counterfeit products in various industries. It uses QR codes, smart contracts, and the Ethereum network to provide a secure and transparent platform for tracking and verifying product authenticity. The system is significant in addressing global supply chain issues by reducing the prevalence of counterfeit goods and enhancing transparency and trust. 

## Live Demo
Here is a live demo of the full functionality of the project 

[![Product Live Demo](https://img.youtube.com/vi/aWkgaCfMEn8/0.jpg)](https://www.youtube.com/watch?v=aWkgaCfMEn8 "Product Walkthrough")

Here is a blog plost of this project:
https://medium.com/p/68d23c7bc41c


## Table of Contents
- [Overview](#overview)
- [Basic Walkthrough](#basic-walkthrough)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview
The Anti-Counterfeit Product Identification System Using Blockchain is a groundbreaking solution designed to combat global supply chain issues related to counterfeit products. It leverages the unique capabilities of blockchain technology to provide a secure and transparent platform for tracking and verifying the authenticity of products across various industries.

The system uses QR codes, an overt technology that can be scanned by a smartphone app, to verify product information and origin. It employs smart contracts to store and execute product verification logic on the blockchain, ensuring tamper-proof data and trustless transactions. The Ethereum network serves as its decentralized database to store product information and status, accessible by authorized parties. A web interface, powered by React, allows users to interact with the system and view product information and history.

The technologies used in this system include Solidity for smart contract development, Hardhat for Ethereum development environment, React for building the user interface, Node.js for backend development, and ethers.js for interacting with the Ethereum blockchain.

This system is significant in solving global supply chain issues as it provides a reliable method to verify the authenticity of products, thereby reducing the prevalence of counterfeit goods. It enhances transparency and trust among stakeholders in the supply chain, from manufacturers to consumers. 

## Basic Walkthrough
- The `identeefi-backend-node` directory contains the codebase for the backend of the system.
- The `identeefi-frontend-react` directory contains the codebase for the frontend of the system.
- The `identeefi-postgres-database` directory contains the csv files for the backend database.
- The `identeefi-smartcontract-solidity` directory contains the smart contract deployed to the Ethereum network.

## Technologies Used
- Solidity
- Hardhat
- React
- Node.js
- ethers.js

## Features
- **QR Codes**: The system uses QR codes as an overt technology that can be scanned by a smartphone app to verify the product information and origin.
- **Smart Contracts**: The system uses smart contracts to store and execute the product verification logic on the blockchain, ensuring tamper-proof data and trustless transactions.
- **Ethereum Network**: The system uses the Ethereum network as its decentralized database to store the product information and status, which can be accessed by authorized parties.
- **Web Interface**: The system uses a web interface powered by React to allow users to interact with the system and view the product information and history.

## Project Setup
To get started with this project, 
1. Clone the repository.
2. In `identeefi-postgres-database`, import the csv files to your own postgres database.
3. In `identeefi-backend-node`, run `npm i` to install the dependencies and change the postgres credentials to your postgres crediantials and run `node postgres.js` to start the backend execution.
4. In `identeefi-frontend-react`, run `npm i` to install the dependencies and run `npm start` to start localhost.
5. You can inspect `identeefi-smartcontract-solidity` directory to view the smart contract details that is deployed to the Sepolia Testnet.
6. To perform transactions, setup your Metamask wallet and connect your wallet to the Sepolia Tesnet Network and transact using SepoliaETH which can be obtained for free on Seplolia Faucet (https://sepoliafaucet.com/).

For more information, you can view our user manual:
[View User Manual](/user-manual.pdf)



