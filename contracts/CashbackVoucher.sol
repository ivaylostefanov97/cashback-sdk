// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/SoulboundERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IWorldID {
    /// @notice Reverts if the zero-knowledge proof is invalid.
    /// @param root The of the Merkle tree
    /// @param groupId The id of the Semaphore group
    /// @param signalHash A keccak256 hash of the Semaphore signal
    /// @param nullifierHash The nullifier hash
    /// @param externalNullifierHash A keccak256 hash of the external nullifier
    /// @param proof The zero-knowledge proof
    /// @dev  Note that a double-signaling check is not included here, and should be carried by the caller.
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view;
}

contract CashbackVoucher is ERC721Base, SoulboundERC721A {
    bool public running;

    string baseURI;

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
        running = true;
        baseURI = _baseURI;
        worldId = _worldId;
        externalNullifier = hashToField(
            abi.encodePacked(hashToField(abi.encodePacked(_appId)), _actionId)
        );
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        restrictTransfers(false);
    }

    function releaseVouchers() public onlyRole(DEFAULT_ADMIN_ROLE) {
        running = true;
    }

    function burnVouchers() public onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint tokenId = 0; tokenId < _currentIndex; tokenId++) {
            _burn(tokenId);
        }

        running = false;
    }

    function mintVoucher(
        address _to /*,
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof*/
    ) public {
        if (!running) revert VouchersNotReleased();
        /*
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            hashToField(abi.encodePacked(signal)),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        // nullifierHashes[nullifierHash] = true;
        */
        uint256 tokenId = nextTokenIdToMint();

        string memory uri = tokenURI(tokenId);

        super.mintTo(_to, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId)));
    }

    function restrictTransfers(bool _toRestrict) public override {
        super.restrictTransfers(_toRestrict);
    }

    /// @dev Returns whether transfers can be restricted in a given execution context.
    function _canRestrictTransfers() internal view override returns (bool) {
        return true;
    }

    /// @dev See {ERC721A-_beforeTokenTransfers}.
    function _beforeTokenTransfers(
        address from,
        address to,
        uint256,
        uint256
    ) internal override(ERC721A, SoulboundERC721A) {
        require(from == address(0) || to == address(0), "Soulbound token.");
        super._beforeTokenTransfers(from, to, 0, 0);
    }

    function hashToField(bytes memory value) public returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}
