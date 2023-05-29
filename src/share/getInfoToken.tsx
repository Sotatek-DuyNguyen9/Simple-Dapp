import erc20Abi from "../web3/abis/erc20.json";
import Web3 from "web3";

export const getCustomTokenBalance = async (accAddress: string) => {
  const web3 = new Web3((window as any).ethereum);

  try {
    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      process.env.REACT_APP_TOKEN_ADDR
    );
    
    const name = await erc20Contract.methods.name().call();
    const symbol = await erc20Contract.methods.symbol().call();
    const decimals = await erc20Contract.methods.decimals().call();
    const totalSupply = await erc20Contract.methods.totalSupply().call();
    let balance = await erc20Contract.methods.balanceOf(accAddress).call();
    const allowance = await erc20Contract.methods.
                          allowance(accAddress, process.env.REACT_APP_TOKEN_ADDR).call()
    balance = (Web3 as any).utils.fromWei(balance);
    
    return { name, symbol, decimals, totalSupply, balance, allowance };
  } catch (error) {
    console.log(error);
  }
};

export const getCoinBalance = async (accAddress: string) => {
  try {
    const balance = await (window as any).ethereum.request({
        method: "eth_getBalance",
        params: [accAddress],
      })
    return (Web3 as any).utils.fromWei(balance);
  } catch (error) {
    console.log(error);
  }
};