# Crypto currency Betting System

![TypeScript](https://img.shields.io/badge/TypeScript-%5E4.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-compatible-green)

## Introduction
This project offers a comprehensive backend solution for a cryptocurrency betting system. It features a series of TypeScript classes designed to manage various aspects of the betting process, from setting up bets and updating statistics to handling the end-to-end workflow of each bet.

## Features
- BetOnSettingJob: Automates the setup and configuration of bets based on cryptocurrency price movements.
- BetOnStatsJob: Manages the calculation and updating of betting statistics, determining winners and losers based on price changes.
- General Job Management: Utilizes a custom JobManager to handle various tasks and maintain the efficiency and reliability of the betting process.
- Logging and Error Handling: Incorporates comprehensive logging and error handling to ensure smooth operation and easy debugging.

## Getting Started

### Prerequisites
- Node.js and npm
- TypeScript
- A compatible database system (MongoDB recommended)

 ### Installation
 1. git clone
```shell
git clone https://github.com/iu7726/crypto-price-bet.git
```
 2. Navigate to the project directory
```shell
cd crypto-price-bet
```
 3. Install dependencies
```shell
npm install
```

## Usage
These backend jobs are designed to be executed within the context of the cryptocurrency betting system. They can be scheduled or triggered based on specific events within the application.

## Running a Job
To run a specific job, use a job scheduler or integrate the job execution within your application logic.