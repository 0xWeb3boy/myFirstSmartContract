const { ethers, run, network } = require("hardhat");
async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("wait deploying contract....");
  const SimpleStorage = await simpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log(`deployed contract to ${SimpleStorage.address}`);

  if (network.config.chainId === 80001 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await SimpleStorage.deployTransaction.wait(6);
    await verify(SimpleStorage.address, []);
  }

  // retrieving the current value
  const currentValue = await SimpleStorage.retrieve();
  console.log(`current value is ${currentValue}`);

  // updating the current value
  const transactionResponse = await SimpleStorage.store(55);
  await transactionResponse.wait(4);
  const updatedValue = await SimpleStorage.retrieve();
  console.log(`updated value is ${updatedValue}`);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
