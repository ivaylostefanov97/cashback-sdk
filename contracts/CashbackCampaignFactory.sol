// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "./CashbackCampaign.sol";
import "./CashbackVoucher.sol";

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

error NotOwner();

contract CashbackCampaignFactory is AutomationCompatibleInterface {
    address public owner;
    address[] public campaigns;
    address public lastCreatedCampaign;
    address public lastCreatedVoucher;

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

        lastCreatedCampaign = address(newCampaign);
        lastCreatedVoucher = address(voucherCollection);

        campaigns.push(address(newCampaign));
        next.push(next.length + 1);
        prev.push(prev.length - 1);
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint countToBeStarted = 0;
        uint countToBeEnded = 0;

        for (uint i = next[0]; i < campaigns.length; i = next[i]) {
            CashbackCampaign campaign = CashbackCampaign(campaigns[i]);
            if (
                !campaign.started() &&
                campaign.startTime() <= block.timestamp + 60 seconds
            ) {
                countToBeStarted += 1;
            } else if (
                !campaign.ended() &&
                block.timestamp >= campaign.endTime() + 60 seconds
            ) {
                countToBeEnded += 1;
            }
        }

        uint[] memory toBeStarted = new uint[](countToBeStarted);
        uint[] memory toBeEnded = new uint[](countToBeEnded);

        for (uint i = next[0]; i < campaigns.length; i = next[i]) {
            CashbackCampaign campaign = CashbackCampaign(campaigns[i]);
            if (
                !campaign.started() &&
                campaign.startTime() <= block.timestamp + 60 seconds
            ) {
                countToBeStarted -= 1;
                toBeStarted[countToBeStarted] = i;
            } else if (
                !campaign.ended() &&
                block.timestamp >= campaign.endTime() + 60 seconds
            ) {
                countToBeEnded -= 1;
                toBeEnded[countToBeEnded] = i;
            }
        }

        upkeepNeeded = toBeStarted.length > 0 || toBeEnded.length > 0;
        performData = abi.encode(toBeStarted, toBeEnded);
    }

    function performUpkeep(bytes calldata performData) external override {
        (uint[] memory toBeStarted, uint[] memory toBeEnded) = abi.decode(
            performData,
            (uint[], uint[])
        );

        for (uint i = 0; i < toBeStarted.length; i++) {
            CashbackCampaign campaign = CashbackCampaign(
                campaigns[toBeStarted[i]]
            );
            campaign.start();
            CashbackVoucher voucher = CashbackVoucher(
                campaign.voucherCollection()
            );
            voucher.releaseVouchers();
        }

        for (uint i = 0; i < toBeEnded.length; i++) {
            CashbackCampaign campaign = CashbackCampaign(
                campaigns[toBeEnded[i]]
            );
            campaign.end();
            CashbackVoucher voucher = CashbackVoucher(
                campaign.voucherCollection()
            );
            voucher.burnVouchers();

            next[prev[toBeEnded[i]]] = next[toBeEnded[i]];
            if (next[toBeEnded[i]] < campaigns.length) {
                prev[next[toBeEnded[i]]] = prev[toBeEnded[i]];
            }
        }
    }
}
