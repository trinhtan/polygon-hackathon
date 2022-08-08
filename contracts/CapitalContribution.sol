// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/";

contract CapitalContribution  is Pausable{
    using SafeERC20 for IERC20;

    uint256 public duration;
    uint256 public memberCount;
    uint256 public price;
    uint256 public startBlock;
    IERC20 public token;

    address public fee;

    constructor(){}
}
