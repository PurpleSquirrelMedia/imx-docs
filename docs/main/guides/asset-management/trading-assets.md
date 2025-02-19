---
id: 'trading-assets'
title: 'Asset Trading'
slug: '/trading-assets'
sidebar_position: 7
keywords: [imx-games]
---

To build a marketplace that supports trading of ImmutableX assets, you need to:

- Use our Orderbook APIs to display assets that are currently for sale.
- Use Link SDK to prompt user actions.

If you haven't already, you should also learn about supporting ImmutableX assets in your application. See: [Asset Ownership](./asset-ownership.mdx).

## Central Orderbook

To help facilitate liquidity, Immutable maintains a central orderbook which can be immediately accessed by any application via our API. Adding your orders to this book will enable them to be filled by any other client application, improving your likelihood of being able to capture fees from these orders.

The APIs for this orderbook are as follows:

- [Get Orders](/reference#/operations/listOrders)
- [Get Order](/reference#/operations/getOrder)
- [Create Order](/reference#/operations/createOrder)
- [Cancel Order](/reference#/operations/cancelOrder)

Currently, ImmutableX doesn't support updating existing orders, only cancellation and replacement.
:::info Expiration timestamp format
When passing in a expiration_timestamp to the Orders API as part of a Post call you will need to convert the time to a Unix timestamp.

The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z). Literally speaking, the epoch is Unix time 0 (midnight 1/1/1970), but 'epoch' is often used as a synonym for Unix time. Some systems store epoch dates as a signed 32-bit integer, which might cause problems on January 19, 2038 (known as the Year 2038 problem or Y2038). The converter on this page converts timestamps in seconds (10-digit), milliseconds (13-digit) and microseconds (16-digit) to readable dates.
:::

## Submitting Trades

If you have matched two orders on L2, you can submit those directly to the API using the [Create Trade](/reference#/operations/createTrade) endpoint. Note that these trades must still be signed by the relevant users.

## Immutable Link

ImmutableX allows users to keep their existing Ethereum wallet: no installations, upgrades or changes required.

To ensure that users are able to sign trades which can be processed by ImmutableX, and to ensure that applications display the correct assets to users and provide them with informed consent, Immutable provides a bridging service called **Immutable Link**. This service uses a signed security string to derive a STARK-friendly ImmutableX key, which the user will use to sign L2 interactions. This ensures that users can always recover assets as long as they retain access to their Ethereum wallet.

Immutable Link is a separate web application, now with iframe support [more information here](../link-sdk/link-iframe-support.md). All StarkEx-specific ImmutableX interactions are abstracted away from your marketplace and into Immutable Link.

Immutable Link will soon be open source and made publicly available.

## Link SDK

Immutable provides a convenient interface for initiating Immutable Link actions in the form of a Typescript SDK. To install the SDK in your project, use:

```bash title="SDK Installation"
npm install @imtbl/imx-link-sdk
```

This SDK allows users to prompt the Immutable Link window using a simple set of Typescript functions (draft interface presented below):

```typescript title="SDK Interface"
interface ETH {
  amount: string;
}

interface ERC20 {
  contract: string;
  amount: string;
}

interface ERC721 {
  contract: string;
  token_id: string;
}

type Asset = ETH | ERC20 | ERC721;

interface Order {
  user: string;
  buy: Asset;
  sell: Asset;
}

interface ETHTxResponse {
  rejectedSignature: boolean;
  rejectedLink: boolean;
  txhash: string;
}

interface ImXTxResponse {
  id: string;
  success: boolean;
}

class Link {
  public deposit(user: string, assets: Array<Asset>): Promise<ETHTxResponse>;
  public withdraw(user: string, assets: Array<Asset>): Promise<ETHTxResponse>;
  public transfer(
    user: string,
    to: string,
    assets: Array<Asset>
  ): Promise<ImXTxReponse>;
  public fill(user: string, orderIDs: Array<string>): Promise<ImXTxReponse>;
  public order(
    user: string,
    orders: Array<Order>,
    broadcast = true
  ): Promise<ImXTxReponse>;
}
```

A high-level overview of the trading process is as follows.
![Trading](/img/Trading.png)

## Example

To help understand how this works, consider a marketplace for Axies:

First, the marketplace uses the [get orders](/reference#/operations/listOrders) endpoint to load a list of active orders. Our buyer decides to buy a Mystic Axie for 3 ETH. The marketplace uses the [Link SDK](../link-sdk/index.md) to prompt the Link.

Link will then use the [get order details](/reference#/operations/getOrder) endpoint to get the required parameters for the user to sign. The user will sign the order, and the Link will use the [submit order](/reference#/operations/createOrder) endpoint to send it to ImmutableX.

The exchange then confirms or rejects the trade, and notifies Link, which will send an `ImXTxResponse` back to the marketplace, which can display the success or failure of the trade to the user. The asset will be _immediately_ available for trading or use within Axie Infinity, provided they [support asset ownership](./asset-ownership.mdx).

## Frequently Asked Questions

_1. Is there an auction flow functionality?_

Currently, the auction flow functionality is not supported yet. It will be coming later.

_2. What happens when a trade happens on Immutable? Is there a callback sent to our servers to adjust our application inventory?_

At the moment, we recommend polling our /mints, /transfers and /trades APIs at regular intervals - we'll likely set up webhooks/sockets in future.

_3. How do we ensure the Smart Contract is utilised whenever the NFT is traded?_

To ensure this, you will need to ban direct transferring from user to user. Best way to combat this is providing the best place to trade and ensuring it’s within ImmutableX.
