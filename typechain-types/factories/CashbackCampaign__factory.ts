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
  "0x60806040523480156200001157600080fd5b506040516200132838038062001328833981810160405281019062000037919062000253565b846000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600281905550806003819055507f6056366dba45431fd6a8854ad9f2594942b02c4f2c3f6fbc329b3079b027b8b460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16306040516200019b9291906200036b565b60405180910390a1505050505062000398565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001e082620001b3565b9050919050565b620001f281620001d3565b8114620001fe57600080fd5b50565b6000815190506200021281620001e7565b92915050565b6000819050919050565b6200022d8162000218565b81146200023957600080fd5b50565b6000815190506200024d8162000222565b92915050565b600080600080600060a08688031215620002725762000271620001ae565b5b6000620002828882890162000201565b9550506020620002958882890162000201565b9450506040620002a88882890162000201565b9350506060620002bb888289016200023c565b9250506080620002ce888289016200023c565b9150509295509295909350565b6000819050919050565b60006200030662000300620002fa84620001b3565b620002db565b620001b3565b9050919050565b60006200031a82620002e5565b9050919050565b60006200032e826200030d565b9050919050565b620003408162000321565b82525050565b600062000353826200030d565b9050919050565b620003658162000346565b82525050565b600060408201905062000382600083018562000335565b6200039160208301846200035a565b9392505050565b610f8080620003a86000396000f3fe6080604052600436106100f35760003560e01c80637b1039991161008a578063be9a655511610059578063be9a6555146102f0578063c885bc5814610307578063efbe1c1c14610311578063fc0c546a14610328576100f3565b80637b1039991461025357806382b2e2571461027e5780638da5cb5b146102a957806392bd38bc146102d4576100f3565b80633197cbb6116100c65780633197cbb6146101b65780634a7bd6f5146101e15780637786f65e146101fd57806378e9792514610228576100f3565b80630700037d146100f857806312fa6feb146101355780631f2698ab146101605780632014e5d11461018b575b600080fd5b34801561010457600080fd5b5061011f600480360381019061011a9190610b4a565b610353565b60405161012c9190610b90565b60405180910390f35b34801561014157600080fd5b5061014a61036b565b6040516101579190610bc6565b60405180910390f35b34801561016c57600080fd5b5061017561037e565b6040516101829190610bc6565b60405180910390f35b34801561019757600080fd5b506101a0610391565b6040516101ad9190610bc6565b60405180910390f35b3480156101c257600080fd5b506101cb6103b0565b6040516101d89190610b90565b60405180910390f35b6101fb60048036038101906101f69190610c0d565b6103b6565b005b34801561020957600080fd5b50610212610495565b60405161021f9190610c5c565b60405180910390f35b34801561023457600080fd5b5061023d6104bb565b60405161024a9190610b90565b60405180910390f35b34801561025f57600080fd5b506102686104c1565b6040516102759190610cd6565b60405180910390f35b34801561028a57600080fd5b506102936104e7565b6040516102a09190610b90565b60405180910390f35b3480156102b557600080fd5b506102be61058a565b6040516102cb9190610d12565b60405180910390f35b6102ee60048036038101906102e99190610d2d565b6105ae565b005b3480156102fc57600080fd5b5061030561077c565b005b61030f61081d565b005b34801561031d57600080fd5b50610326610a20565b005b34801561033457600080fd5b5061033d610ac1565b60405161034a9190610d7b565b60405180910390f35b60046020528060005260406000206000915090505481565b600160159054906101000a900460ff1681565b600160149054906101000a900460ff1681565b60008042905080600254111580156103aa575060035481105b91505090565b60035481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461043b576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461048a9190610dc5565b925050819055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016105449190610c5c565b602060405180830381865afa158015610561573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105859190610e30565b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161060b9190610c5c565b602060405180830381865afa158015610628573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064c9190610e30565b90508181101561069e5780826106629190610e5d565b6040517f7b14c4000000000000000000000000000000000000000000000000000000000081526004016106959190610b90565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016106fd93929190610e91565b6020604051808303816000875af115801561071c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107409190610ef4565b507f037fbd531560b99c45925a766dd7d625fe645da7af58bad4007af8b865fba101826040516107709190610b90565b60405180910390a15050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610801576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018060146101000a81548160ff021916908315150217905550565b60003390506000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081116108a0576040517f7ba9d53300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006108aa6104e7565b9050818110156108fc5780826108c09190610e5d565b6040517fb85248540000000000000000000000000000000000000000000000000000000081526004016108f39190610b90565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b8152600401610959929190610f21565b6020604051808303816000875af1158015610978573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099c9190610ef4565b506000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f6177f4110771217c72937d51f3a73915f2c714a6b98507e17eea7a186136a24a8383604051610a13929190610f21565b60405180910390a1505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610aa5576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018060156101000a81548160ff021916908315150217905550565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b1782610aec565b9050919050565b610b2781610b0c565b8114610b3257600080fd5b50565b600081359050610b4481610b1e565b92915050565b600060208284031215610b6057610b5f610ae7565b5b6000610b6e84828501610b35565b91505092915050565b6000819050919050565b610b8a81610b77565b82525050565b6000602082019050610ba56000830184610b81565b92915050565b60008115159050919050565b610bc081610bab565b82525050565b6000602082019050610bdb6000830184610bb7565b92915050565b610bea81610b77565b8114610bf557600080fd5b50565b600081359050610c0781610be1565b92915050565b60008060408385031215610c2457610c23610ae7565b5b6000610c3285828601610b35565b9250506020610c4385828601610bf8565b9150509250929050565b610c5681610b0c565b82525050565b6000602082019050610c716000830184610c4d565b92915050565b6000819050919050565b6000610c9c610c97610c9284610aec565b610c77565b610aec565b9050919050565b6000610cae82610c81565b9050919050565b6000610cc082610ca3565b9050919050565b610cd081610cb5565b82525050565b6000602082019050610ceb6000830184610cc7565b92915050565b6000610cfc82610aec565b9050919050565b610d0c81610cf1565b82525050565b6000602082019050610d276000830184610d03565b92915050565b600060208284031215610d4357610d42610ae7565b5b6000610d5184828501610bf8565b91505092915050565b6000610d6582610ca3565b9050919050565b610d7581610d5a565b82525050565b6000602082019050610d906000830184610d6c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610dd082610b77565b9150610ddb83610b77565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e1057610e0f610d96565b5b828201905092915050565b600081519050610e2a81610be1565b92915050565b600060208284031215610e4657610e45610ae7565b5b6000610e5484828501610e1b565b91505092915050565b6000610e6882610b77565b9150610e7383610b77565b925082821015610e8657610e85610d96565b5b828203905092915050565b6000606082019050610ea66000830186610c4d565b610eb36020830185610c4d565b610ec06040830184610b81565b949350505050565b610ed181610bab565b8114610edc57600080fd5b50565b600081519050610eee81610ec8565b92915050565b600060208284031215610f0a57610f09610ae7565b5b6000610f1884828501610edf565b91505092915050565b6000604082019050610f366000830185610c4d565b610f436020830184610b81565b939250505056fea26469706673582212204f9cd631cb97754db2fc6eec2b2a5ad360b78a9f0c20b20db71ddc6ff3a2410c64736f6c634300080a0033";

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
