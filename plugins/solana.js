import * as solanaWeb3 from '@solana/web3.js'
export default (_, inject) => {
  inject('solana', solanaWeb3)
}
