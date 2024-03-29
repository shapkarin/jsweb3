import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and display the balance of a specific ERC-20 token for a given account.
 * This hook listens for changes in the `web3` instance, `account`, `tokenContractAddress`, or `tokenContractABI`,
 * and updates the token balance accordingly.
 * 
 * Utilizes the `web3.eth.Contract` method to create a contract instance with the provided ABI and address,
 * then calls the `balanceOf` function of the contract to get the account's token balance. The balance
 * is then converted from Wei to a more readable format (e.g., Mwei for tokens like USDT).
 * 
 * ABI is essential for interacting with Ethereum smart contracts from the client-side
 * using the Web3.js library. It stands for Application Binary Interface and acts as a bridge 
 * between your JavaScript application and the smart contract on the Ethereum blockchain.
 * 
 * The ABI is a JSON array that details the contract's functions, including their names, input 
 * parameters, output types, and event signatures. This information allows Web3.js to correctly
 * format calls to the contract's functions and parse their outputs. Essentially, the ABI tells 
 * Web3.js how to encode function calls into the low-level data formats that the Ethereum network 
 * understands, and how to decode data returned from the blockchain back into JavaScript types.
 * 
 * With `myContractInstance`, you can now interact with the smart contract: calling its read-only 
 * methods, executing transactions that alter its state, or subscribing to events. This interaction
 * happens directly from the user's browser, providing a seamless integration between your web 
 * application and the Ethereum blockchain.
 * 
 * Note: The ABI must precisely match the smart contract you wish to interact with, as it is 
 * contract-specific. An incorrect or outdated ABI will result in errors when attempting to 
 * communicate with the contract.
 * 
 * @param {Web3} web3 - The Web3 instance used for blockchain interactions.
 * @param {string} account - The Ethereum account address to fetch the token balance for.
 * @param {string} tokenContractAddress - The contract address of the ERC-20 token.
 * @param {Object[]} tokenContractABI - The ABI of the ERC-20 token contract, necessary for interacting with the contract.
 * @returns {string} The token balance of the specified account, adjusted for token decimals.
 * 
 * @see {@link https://docs.web3js.org/api/web3-eth-contract/class/Contract/} for more on `web3.eth.Contract`.
 * @see {@link https://docs.web3js.org/api/web3-utils/function/fromWei/} for conversion utility functions like `fromWei`.
 * 
 */
function useTokenBalance(web3, account, tokenContractAddress, tokenContractABI) {
  const [tokenBalance, setTokenBalance] = useState('');

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (web3 && account && tokenContractAddress && tokenContractABI) {
        const contract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
        const balance = await contract.methods.balanceOf(account).call();
        setTokenBalance(web3.utils.fromWei(balance, 'mwei')); // Assuming 'mwei' is correct for the token in question (e.g., USDT)
      }
    };

    fetchTokenBalance();
  }, [web3, account, tokenContractAddress, tokenContractABI]);

  return tokenBalance;
}

export default useTokenBalance;