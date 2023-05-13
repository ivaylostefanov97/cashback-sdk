import { request } from 'graphql-request'

export const checkUserHasToken = async (walletAddress: string, tokenAddress: string, minBalance: number) => {
    const query =` {
        TokenBalances(
          input: {
            filter: {
              tokenAddress: {_eq: "${tokenAddress}"},
              owner: {_eq: "${walletAddress}"}
            },
            blockchain: ethereum,
            limit: 10
          }
        ) {
          TokenBalance {
            tokenAddress
            amount
            formattedAmount
            owner {
              addresses
            }
            token {
              name
              symbol
            }
          }
        }
      }`

    const response: any = await request('https://api.airstack.xyz/gql', query);

    console.log("GRAPHQL TOKEN RESPONSE: ", JSON.stringify(response, null, 4));

    const formattedAmount = response?.data?.TokenBalances?.TokenBalance[0]?.formattedAmount;

    if (!formattedAmount) {
        return false;
    }

    if (formattedAmount > minBalance) {
        return true;
    }
}

export const checkUserHasNFT = async (walletAddress: string, tokenAddress: string, minBalance: number) => {
    const query =` query MyQuery {
        TokenBalances(
          input: {
            filter: {
              owner: {_eq: "${walletAddress}"},
              tokenAddress: {_eq: "${tokenAddress}"},
              tokenType: {_in: [ERC1155, ERC721]}
            },
            blockchain: ethereum,
            limit: 10
          }
        ) {
          TokenBalance {
            tokenAddress
            amount
            tokenType
            owner {
              addresses
            }
            tokenNfts {
              address
              tokenId
              blockchain
            }
          }
        }
      }`

    const response: any = await request('https://api.airstack.xyz/gql', query);

    console.log("GRAPHQL NFT RESPONSE: ", JSON.stringify(response, null, 4));

    const amount = response?.data?.TokenBalances?.TokenBalance[0]?.amount;

    if (!amount) {
        return false;
    }

    if (amount > minBalance) {
        return true;
    }
}