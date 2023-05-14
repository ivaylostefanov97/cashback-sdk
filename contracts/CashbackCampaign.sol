// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC20.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC721.sol";

contract CashbackCampaign {
    address payable public owner;
    address public voucherCollection;

    bool public started;
    bool public ended;
    uint public startTime;
    uint public endTime;

    mapping(address => uint256) public rewards;

    IERC20 public token;
    IERC721 public registry;

    event CampaignCreated(address custodian, CashbackCampaign campaign);
    event CampaignFunded(uint256 depositedTokens);
    event CampaignEnded(uint256 withdrawnTokens);
    event RewardSent(address participant, uint256 amount);

    error NotOwner();
    error NotParticipant();
    error ParticipantZeroBalance();
    error BenefactorInsufficientFunds(uint256 amountPayable);
    error CampaignInsufficientFunds(uint256 amountPayable);

    constructor(
        address _owner,
        address _tokenAddress,
        address _voucherCollection,
        uint _startTime,
        uint _endTime
    ) {
        owner = payable(_owner);

        token = IERC20(_tokenAddress);
        registry = IERC721(_voucherCollection);
        voucherCollection = _voucherCollection;

        startTime = _startTime;
        endTime = _endTime;

        emit CampaignCreated(owner, this);
    }

    function start() public {
        if (msg.sender != owner) revert NotOwner();
        started = true;
    }

    function end() public {
        if (msg.sender != owner) revert NotOwner();
        ended = true;
    }

    function isRunning() public view returns (bool) {
        uint currentTime = block.timestamp;
        return startTime <= currentTime && currentTime < endTime;
    }

    function incrementRewardBalance(
        address participant,
        uint256 reward
    ) external payable {
        if (msg.sender != owner) revert NotOwner();
        rewards[participant] += reward;
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function fundCampaign(uint256 rewardPool) external payable {
        uint256 benefactorBalance = token.balanceOf(msg.sender);
        if (benefactorBalance < rewardPool)
            revert BenefactorInsufficientFunds(rewardPool - benefactorBalance);

        token.transferFrom(msg.sender, address(this), rewardPool);
        emit CampaignFunded(rewardPool);
    }

    function withdrawReward() external payable {
        address participant = msg.sender;
        uint256 reward = rewards[participant];

        if (reward <= 0) revert ParticipantZeroBalance();

        uint256 tokenBalance = getTokenBalance();
        if (tokenBalance < reward) {
            revert CampaignInsufficientFunds(reward - tokenBalance);
        }

        token.transfer(participant, reward);
        rewards[participant] = 0;

        emit RewardSent(participant, reward);
    }
}
