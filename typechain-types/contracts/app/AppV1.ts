/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface AppV1Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "getPostPurchasedData"
      | "initialize"
      | "pay"
      | "setAccountStatus"
      | "setContractStatus"
      | "setRole"
      | "setTicketExpiration"
      | "setTokenStatus"
      | "upgrade"
      | "version"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "EffectivelyTransfer"
      | "Initialized"
      | "Pay"
      | "SetAccountStatus"
      | "SetContractStatus"
      | "SetPriceCalculator"
      | "SetRole"
      | "SetTicketExpiration"
      | "SetTokenStatus"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getPostPurchasedData",
    values: [AddressLike, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "pay",
    values: [
      BytesLike,
      BytesLike,
      BytesLike,
      BigNumberish,
      BytesLike,
      BytesLike,
      BigNumberish,
      BigNumberish,
      AddressLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setAccountStatus",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setContractStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRole",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTicketExpiration",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenStatus",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "upgrade", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getPostPurchasedData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAccountStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setContractStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTicketExpiration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace EffectivelyTransferEvent {
  export type InputTuple = [
    signer: AddressLike,
    from: AddressLike,
    to: AddressLike,
    ticketID: BigNumberish,
    token: AddressLike,
    amount: BigNumberish,
    transferType: BigNumberish
  ];
  export type OutputTuple = [
    signer: string,
    from: string,
    to: string,
    ticketID: bigint,
    token: string,
    amount: bigint,
    transferType: bigint
  ];
  export interface OutputObject {
    signer: string;
    from: string;
    to: string;
    ticketID: bigint;
    token: string;
    amount: bigint;
    transferType: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PayEvent {
  export type InputTuple = [
    signer: AddressLike,
    customer: AddressLike,
    ticketID: BigNumberish,
    token: AddressLike,
    paymentAmount: BigNumberish
  ];
  export type OutputTuple = [
    signer: string,
    customer: string,
    ticketID: bigint,
    token: string,
    paymentAmount: bigint
  ];
  export interface OutputObject {
    signer: string;
    customer: string;
    ticketID: bigint;
    token: string;
    paymentAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetAccountStatusEvent {
  export type InputTuple = [
    account: AddressLike,
    previousStatus: BigNumberish,
    newStatus: BigNumberish
  ];
  export type OutputTuple = [
    account: string,
    previousStatus: bigint,
    newStatus: bigint
  ];
  export interface OutputObject {
    account: string;
    previousStatus: bigint;
    newStatus: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetContractStatusEvent {
  export type InputTuple = [
    previousStatus: BigNumberish,
    newStatus: BigNumberish
  ];
  export type OutputTuple = [previousStatus: bigint, newStatus: bigint];
  export interface OutputObject {
    previousStatus: bigint;
    newStatus: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetPriceCalculatorEvent {
  export type InputTuple = [
    previousHandlingFeeRatio: BigNumberish,
    newHandlingFeeRatio: BigNumberish
  ];
  export type OutputTuple = [
    previousHandlingFeeRatio: bigint,
    newHandlingFeeRatio: bigint
  ];
  export interface OutputObject {
    previousHandlingFeeRatio: bigint;
    newHandlingFeeRatio: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetRoleEvent {
  export type InputTuple = [
    account: AddressLike,
    previousRole: BigNumberish,
    newRole: BigNumberish
  ];
  export type OutputTuple = [
    account: string,
    previousRole: bigint,
    newRole: bigint
  ];
  export interface OutputObject {
    account: string;
    previousRole: bigint;
    newRole: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetTicketExpirationEvent {
  export type InputTuple = [
    previousExpiration: BigNumberish,
    newExpiration: BigNumberish
  ];
  export type OutputTuple = [previousExpiration: bigint, newExpiration: bigint];
  export interface OutputObject {
    previousExpiration: bigint;
    newExpiration: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetTokenStatusEvent {
  export type InputTuple = [
    token: AddressLike,
    previousStatus: BigNumberish,
    newStatus: BigNumberish
  ];
  export type OutputTuple = [
    token: string,
    previousStatus: bigint,
    newStatus: bigint
  ];
  export interface OutputObject {
    token: string;
    previousStatus: bigint;
    newStatus: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AppV1 extends BaseContract {
  connect(runner?: ContractRunner | null): AppV1;
  waitForDeployment(): Promise<this>;

  interface: AppV1Interface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getPostPurchasedData: TypedContractMethod<
    [signer: AddressLike, postID: BigNumberish, purchaser: AddressLike],
    [bigint],
    "view"
  >;

  initialize: TypedContractMethod<
    [initialAdmin: AddressLike],
    [void],
    "nonpayable"
  >;

  pay: TypedContractMethod<
    [
      serverSignature: BytesLike,
      sellerTermsMessageHash: BytesLike,
      sellerTermsSignature: BytesLike,
      buyerSignatureVersion: BigNumberish,
      affiliateTermsMessageHash: BytesLike,
      affiliateTermsSignature: BytesLike,
      purchaseTicketID: BigNumberish,
      postID: BigNumberish,
      paymentToken: AddressLike,
      paymentAmount: BigNumberish,
      affiliateRatio: BigNumberish
    ],
    [void],
    "payable"
  >;

  setAccountStatus: TypedContractMethod<
    [account: AddressLike, status: BigNumberish],
    [void],
    "nonpayable"
  >;

  setContractStatus: TypedContractMethod<
    [status: BigNumberish],
    [void],
    "nonpayable"
  >;

  setRole: TypedContractMethod<
    [account: AddressLike, role: BigNumberish],
    [void],
    "nonpayable"
  >;

  setTicketExpiration: TypedContractMethod<
    [expiration: BigNumberish],
    [void],
    "nonpayable"
  >;

  setTokenStatus: TypedContractMethod<
    [token: AddressLike, status: BigNumberish],
    [void],
    "nonpayable"
  >;

  upgrade: TypedContractMethod<[], [void], "nonpayable">;

  version: TypedContractMethod<[], [bigint], "view">;

  withdraw: TypedContractMethod<
    [to: AddressLike, contractAddress: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getPostPurchasedData"
  ): TypedContractMethod<
    [signer: AddressLike, postID: BigNumberish, purchaser: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[initialAdmin: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pay"
  ): TypedContractMethod<
    [
      serverSignature: BytesLike,
      sellerTermsMessageHash: BytesLike,
      sellerTermsSignature: BytesLike,
      buyerSignatureVersion: BigNumberish,
      affiliateTermsMessageHash: BytesLike,
      affiliateTermsSignature: BytesLike,
      purchaseTicketID: BigNumberish,
      postID: BigNumberish,
      paymentToken: AddressLike,
      paymentAmount: BigNumberish,
      affiliateRatio: BigNumberish
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setAccountStatus"
  ): TypedContractMethod<
    [account: AddressLike, status: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setContractStatus"
  ): TypedContractMethod<[status: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setRole"
  ): TypedContractMethod<
    [account: AddressLike, role: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setTicketExpiration"
  ): TypedContractMethod<[expiration: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTokenStatus"
  ): TypedContractMethod<
    [token: AddressLike, status: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "upgrade"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [to: AddressLike, contractAddress: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "EffectivelyTransfer"
  ): TypedContractEvent<
    EffectivelyTransferEvent.InputTuple,
    EffectivelyTransferEvent.OutputTuple,
    EffectivelyTransferEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "Pay"
  ): TypedContractEvent<
    PayEvent.InputTuple,
    PayEvent.OutputTuple,
    PayEvent.OutputObject
  >;
  getEvent(
    key: "SetAccountStatus"
  ): TypedContractEvent<
    SetAccountStatusEvent.InputTuple,
    SetAccountStatusEvent.OutputTuple,
    SetAccountStatusEvent.OutputObject
  >;
  getEvent(
    key: "SetContractStatus"
  ): TypedContractEvent<
    SetContractStatusEvent.InputTuple,
    SetContractStatusEvent.OutputTuple,
    SetContractStatusEvent.OutputObject
  >;
  getEvent(
    key: "SetPriceCalculator"
  ): TypedContractEvent<
    SetPriceCalculatorEvent.InputTuple,
    SetPriceCalculatorEvent.OutputTuple,
    SetPriceCalculatorEvent.OutputObject
  >;
  getEvent(
    key: "SetRole"
  ): TypedContractEvent<
    SetRoleEvent.InputTuple,
    SetRoleEvent.OutputTuple,
    SetRoleEvent.OutputObject
  >;
  getEvent(
    key: "SetTicketExpiration"
  ): TypedContractEvent<
    SetTicketExpirationEvent.InputTuple,
    SetTicketExpirationEvent.OutputTuple,
    SetTicketExpirationEvent.OutputObject
  >;
  getEvent(
    key: "SetTokenStatus"
  ): TypedContractEvent<
    SetTokenStatusEvent.InputTuple,
    SetTokenStatusEvent.OutputTuple,
    SetTokenStatusEvent.OutputObject
  >;

  filters: {
    "EffectivelyTransfer(address,address,address,uint256,address,uint256,uint256)": TypedContractEvent<
      EffectivelyTransferEvent.InputTuple,
      EffectivelyTransferEvent.OutputTuple,
      EffectivelyTransferEvent.OutputObject
    >;
    EffectivelyTransfer: TypedContractEvent<
      EffectivelyTransferEvent.InputTuple,
      EffectivelyTransferEvent.OutputTuple,
      EffectivelyTransferEvent.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "Pay(address,address,uint256,address,uint256)": TypedContractEvent<
      PayEvent.InputTuple,
      PayEvent.OutputTuple,
      PayEvent.OutputObject
    >;
    Pay: TypedContractEvent<
      PayEvent.InputTuple,
      PayEvent.OutputTuple,
      PayEvent.OutputObject
    >;

    "SetAccountStatus(address,uint256,uint256)": TypedContractEvent<
      SetAccountStatusEvent.InputTuple,
      SetAccountStatusEvent.OutputTuple,
      SetAccountStatusEvent.OutputObject
    >;
    SetAccountStatus: TypedContractEvent<
      SetAccountStatusEvent.InputTuple,
      SetAccountStatusEvent.OutputTuple,
      SetAccountStatusEvent.OutputObject
    >;

    "SetContractStatus(uint256,uint256)": TypedContractEvent<
      SetContractStatusEvent.InputTuple,
      SetContractStatusEvent.OutputTuple,
      SetContractStatusEvent.OutputObject
    >;
    SetContractStatus: TypedContractEvent<
      SetContractStatusEvent.InputTuple,
      SetContractStatusEvent.OutputTuple,
      SetContractStatusEvent.OutputObject
    >;

    "SetPriceCalculator(uint256,uint256)": TypedContractEvent<
      SetPriceCalculatorEvent.InputTuple,
      SetPriceCalculatorEvent.OutputTuple,
      SetPriceCalculatorEvent.OutputObject
    >;
    SetPriceCalculator: TypedContractEvent<
      SetPriceCalculatorEvent.InputTuple,
      SetPriceCalculatorEvent.OutputTuple,
      SetPriceCalculatorEvent.OutputObject
    >;

    "SetRole(address,uint256,uint256)": TypedContractEvent<
      SetRoleEvent.InputTuple,
      SetRoleEvent.OutputTuple,
      SetRoleEvent.OutputObject
    >;
    SetRole: TypedContractEvent<
      SetRoleEvent.InputTuple,
      SetRoleEvent.OutputTuple,
      SetRoleEvent.OutputObject
    >;

    "SetTicketExpiration(uint256,uint256)": TypedContractEvent<
      SetTicketExpirationEvent.InputTuple,
      SetTicketExpirationEvent.OutputTuple,
      SetTicketExpirationEvent.OutputObject
    >;
    SetTicketExpiration: TypedContractEvent<
      SetTicketExpirationEvent.InputTuple,
      SetTicketExpirationEvent.OutputTuple,
      SetTicketExpirationEvent.OutputObject
    >;

    "SetTokenStatus(address,uint256,uint256)": TypedContractEvent<
      SetTokenStatusEvent.InputTuple,
      SetTokenStatusEvent.OutputTuple,
      SetTokenStatusEvent.OutputObject
    >;
    SetTokenStatus: TypedContractEvent<
      SetTokenStatusEvent.InputTuple,
      SetTokenStatusEvent.OutputTuple,
      SetTokenStatusEvent.OutputObject
    >;
  };
}