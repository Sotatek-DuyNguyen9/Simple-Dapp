import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const RPC_URLS: { [chainId: number]: string } = {
  97: "https://endpoints.omniatech.io/v1/bsc/testnet/public"
}

export const injected = new InjectedConnector({ supportedChainIds: [97] })

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})
