const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, SimpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number 0", async function () {
    const currentValue = await SimpleStorage.retrieve();
    const expectedCurrentValue = "0";

    assert.equal(currentValue.toString(), expectedCurrentValue);
  });

  it("Should update value when we call store function", async function () {
    const updatedValue = "55";
    const transactionResponse = await SimpleStorage.store(55);
    await transactionResponse.wait(1);

    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), updatedValue);
  });

  // it("Should set the right owner", async function () {
  //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //   expect(await lock.owner()).to.equal(owner.address);
  // })
});
