async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Concert = await ethers.getContractFactory("ConcertTickets");
  const concert = await Concert.deploy("Koncert Rockowy 2025", 100, ethers.utils.parseEther("1"));
  await concert.deployed();
  console.log("Contract address:", concert.address);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
