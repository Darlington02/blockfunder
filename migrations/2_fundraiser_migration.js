const Fundraiser = artifacts.require("Fundraiser");

module.exports = function(deployer){
    deployer.deploy(Fundraiser, "50000000000000000000");
}