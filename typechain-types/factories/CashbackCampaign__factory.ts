/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  CashbackCampaign,
  CashbackCampaignInterface,
} from "../CashbackCampaign";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_voucherCollection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountPayable",
        type: "uint256",
      },
    ],
    name: "BenefactorInsufficientFunds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountPayable",
        type: "uint256",
      },
    ],
    name: "CampaignInsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotParticipant",
    type: "error",
  },
  {
    inputs: [],
    name: "ParticipantZeroBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "custodian",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract CashbackCampaign",
        name: "campaign",
        type: "address",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawnTokens",
        type: "uint256",
      },
    ],
    name: "CampaignEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedTokens",
        type: "uint256",
      },
    ],
    name: "CampaignFunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardSent",
    type: "event",
  },
  {
    inputs: [],
    name: "end",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ended",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rewardPool",
        type: "uint256",
      },
    ],
    name: "fundCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "incrementRewardBalance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "isRunning",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "started",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voucherCollection",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawReward",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161093b38038061093b83398101604081905261002f916100dc565b600080546001600160a01b038781166001600160a01b031992831681179093556005805488831690841617905560068054918716918316821790556001805490921617905560028390556003829055604080519182523060208301527f6056366dba45431fd6a8854ad9f2594942b02c4f2c3f6fbc329b3079b027b8b4910160405180910390a15050505050610132565b80516001600160a01b03811681146100d757600080fd5b919050565b600080600080600060a086880312156100f457600080fd5b6100fd866100c0565b945061010b602087016100c0565b9350610119604087016100c0565b6060870151608090970151959894975095949392505050565b6107fa806101416000396000f3fe6080604052600436106100d35760003560e01c80637b1039991161007a5780637b103999146101ed57806382b2e2571461020d5780638da5cb5b1461022257806392bd38bc14610242578063be9a655514610255578063c885bc581461026a578063efbe1c1c14610272578063fc0c546a1461028757600080fd5b80630700037d146100d857806312fa6feb146101185780631f2698ab146101495780632014e5d11461016a5780633197cbb61461017f5780634a7bd6f5146101955780637786f65e146101aa57806378e97925146101d7575b600080fd5b3480156100e457600080fd5b506101056100f33660046106cb565b60046020526000908152604090205481565b6040519081526020015b60405180910390f35b34801561012457600080fd5b5060015461013990600160a81b900460ff1681565b604051901515815260200161010f565b34801561015557600080fd5b5060015461013990600160a01b900460ff1681565b34801561017657600080fd5b506101396102a7565b34801561018b57600080fd5b5061010560035481565b6101a86101a33660046106ed565b6102c6565b005b3480156101b657600080fd5b506001546101ca906001600160a01b031681565b60405161010f9190610717565b3480156101e357600080fd5b5061010560025481565b3480156101f957600080fd5b506006546101ca906001600160a01b031681565b34801561021957600080fd5b50610105610322565b34801561022e57600080fd5b506000546101ca906001600160a01b031681565b6101a861025036600461072b565b610399565b34801561026157600080fd5b506101a86104f6565b6101a8610536565b34801561027e57600080fd5b506101a861066f565b34801561029357600080fd5b506005546101ca906001600160a01b031681565b60008042905080600254111580156102c0575060035481105b91505090565b6000546001600160a01b031633146102f1576040516330cd747160e01b815260040160405180910390fd5b6001600160a01b0382166000908152600460205260408120805483929061031990849061075a565b90915550505050565b6005546040516370a0823160e01b81526000916001600160a01b0316906370a0823190610353903090600401610717565b602060405180830381865afa158015610370573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103949190610772565b905090565b6005546040516370a0823160e01b81526000916001600160a01b0316906370a08231906103ca903390600401610717565b602060405180830381865afa1580156103e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040b9190610772565b9050818110156104435761041f818361078b565b604051621ec53160ea1b815260040161043a91815260200190565b60405180910390fd5b6005546040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b03909116906323b872dd906064016020604051808303816000875af115801561049a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104be91906107a2565b506040518281527f037fbd531560b99c45925a766dd7d625fe645da7af58bad4007af8b865fba1019060200160405180910390a15050565b6000546001600160a01b03163314610521576040516330cd747160e01b815260040160405180910390fd5b6001805460ff60a01b1916600160a01b179055565b336000818152600460205260409020548061056457604051637ba9d53360e01b815260040160405180910390fd5b600061056e610322565b90508181101561059e57610582818361078b565b604051632e14921560e21b815260040161043a91815260200190565b60055460405163a9059cbb60e01b81526001600160a01b038581166004830152602482018590529091169063a9059cbb906044016020604051808303816000875af11580156105f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061591906107a2565b506001600160a01b038316600081815260046020908152604080832092909255815192835282018490527f6177f4110771217c72937d51f3a73915f2c714a6b98507e17eea7a186136a24a910160405180910390a1505050565b6000546001600160a01b0316331461069a576040516330cd747160e01b815260040160405180910390fd5b6001805460ff60a81b1916600160a81b179055565b80356001600160a01b03811681146106c657600080fd5b919050565b6000602082840312156106dd57600080fd5b6106e6826106af565b9392505050565b6000806040838503121561070057600080fd5b610709836106af565b946020939093013593505050565b6001600160a01b0391909116815260200190565b60006020828403121561073d57600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561076d5761076d610744565b500190565b60006020828403121561078457600080fd5b5051919050565b60008282101561079d5761079d610744565b500390565b6000602082840312156107b457600080fd5b815180151581146106e657600080fdfea2646970667358221220de680b05d5fc5b07bdd3d89d68204dd1ba922586980f60a9942e9835ea9fa31f64736f6c634300080a0033";

type CashbackCampaignConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CashbackCampaignConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CashbackCampaign__factory extends ContractFactory {
  constructor(...args: CashbackCampaignConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    _tokenAddress: PromiseOrValue<string>,
    _voucherCollection: PromiseOrValue<string>,
    _startTime: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CashbackCampaign> {
    return super.deploy(
      _owner,
      _tokenAddress,
      _voucherCollection,
      _startTime,
      _endTime,
      overrides || {}
    ) as Promise<CashbackCampaign>;
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    _tokenAddress: PromiseOrValue<string>,
    _voucherCollection: PromiseOrValue<string>,
    _startTime: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _owner,
      _tokenAddress,
      _voucherCollection,
      _startTime,
      _endTime,
      overrides || {}
    );
  }
  override attach(address: string): CashbackCampaign {
    return super.attach(address) as CashbackCampaign;
  }
  override connect(signer: Signer): CashbackCampaign__factory {
    return super.connect(signer) as CashbackCampaign__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CashbackCampaignInterface {
    return new utils.Interface(_abi) as CashbackCampaignInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CashbackCampaign {
    return new Contract(address, _abi, signerOrProvider) as CashbackCampaign;
  }
}
