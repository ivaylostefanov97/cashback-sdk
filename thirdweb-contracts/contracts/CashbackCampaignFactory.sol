// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./CashbackCampaign.sol";
import "./CashbackVoucher.sol";

error NotOwner();

contract CashbackCampaignFactory {
    address public owner;
    address[] public campaigns;

    IWorldID internal immutable worldId;
    string appId;
    string actionId;

    uint[] next;
    uint[] prev;

    constructor(
        address _owner,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        owner = _owner;
        worldId = _worldId;
        appId = _appId;
        actionId = _actionId;

        // Initialize linked list.
        campaigns.push(address(0));
        next.push(1);
        prev.push(0);
    }

    function createCampaign(
        address tokenAddress,
        uint _startTime,
        uint _endTime,
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) external {
        if (msg.sender != owner) revert NotOwner();

        CashbackVoucher voucherCollection = new CashbackVoucher(
            _name,
            _symbol,
            _baseURI,
            address(this),
            0,
            address(this),
            worldId,
            appId,
            actionId
        );

        CashbackCampaign newCampaign = new CashbackCampaign(
            owner,
            tokenAddress,
            address(voucherCollection),
            _startTime,
            _endTime
        );

        campaigns.push(address(newCampaign));
        next.push(next.length + 1);
        prev.push(prev.length - 1);
    }
}
