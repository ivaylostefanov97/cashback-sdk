// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {ByteHasher} from "ByteHasher.sol";
import {IWorldID} from "IWorldID.sol";

contract CashbackVoucher is ERC721Base, PermissionsEnumerable {
    bool running;

    string baseURI;

    using ByteHasher for bytes;

    error VouchersNotReleased();

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _admin,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {
        running = false;
        baseURI = _baseURI;
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    function releaseVouchers() external onlyRole(DEFAULT_ADMIN_ROLE) {
        running = true;
    }

    function burnVouchers() external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint tokenId = 0; tokenId < _currentIndex; tokenId++) {
            _burn(tokenId);
        }

        running = false;
    }

    function mintVoucher(
        address _to,
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        if (!running) revert VouchersNotReleased();

        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        uint256 tokenId = nextTokenIdToMint();

        string memory uri = tokenURI(tokenId);

        super.mintTo(_to, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId)));
    }
}
