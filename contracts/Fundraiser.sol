// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Fundraiser{
    address payable public owner;
    uint public amountToBeRaised;
    uint public amountRaised;
    bool public hasEnded;

    constructor(uint _amountToBeRaised) {
        owner = payable(msg.sender);
        amountToBeRaised = _amountToBeRaised;
        hasEnded = false;
    }

    // only dev can carry out this function
    modifier onlyOwner{
        require(msg.sender == owner, "This function can only be performed by the owner of this contract");
        _;
    }

    // this function can only be called after campaign has ended
    modifier campaignHasEnded{
        require(hasEnded == true, "This function cannot be called until the fundraising is over");
        _;
    }

    // this modifier specifies criterions for accepting ether
    modifier canReceiveDonation{
        require(hasEnded == false && amountRaised < amountToBeRaised, "This contract can no longer receive donations");
        _;
    }

    receive() external payable{}

    function donate() external payable canReceiveDonation{
        amountRaised += msg.value;
    }

    // this function withdraws all the contract funds
    function withdraw() external onlyOwner campaignHasEnded{
        payable(msg.sender).transfer(amountRaised);
    }

    // this contract ends the campaign
    function endCampaign() external onlyOwner{
        hasEnded = true;
    }
}