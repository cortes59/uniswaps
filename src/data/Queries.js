import { gql } from "@apollo/client";

export const TEST_QUERY = gql`
  {
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeUSD
    }
    bundles(first: 5) {
      id
      ethPriceUSD
    }
  }
`;

export const TOP_POOLS_QUERY = gql`
  query getTopPools($first: Int, $skip: Int) {
    pools(first: $first, skip: $skip, orderBy: volume, orderDirection: desc) {
      id
      totalValueLockedUSD
      volumeUSD
      liquidity
      token1 {
        id
        name
        symbol
        volume
      }
      token0 {
        id
        name
        symbol
        volume
      }
    }
  }
`;

export const TOKENS_BY_DATE = gql`
  query tokensByDate($startDate: Int, $endDate: Int, $first: Int, $skip: Int) {
    tokens(
      first: $first
      skip: $skip
      where: { tokenDayData_: { date_gte: $startDate, date_lte: $endDate, date: $endDate } }
    ) {
      id
      totalValueLocked
      symbol
      name
      volume
      tokenDayData(
        first: 10
        where: { date_gte: $startDate, date_lte: $endDate }
      ) {
        id
        date
        high
        low
        open
        close
        totalValueLocked
        volume
      }
    }
  }
`;