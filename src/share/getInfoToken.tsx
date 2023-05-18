import erc20Abi from "../web3/abis/erc20.json";
import Web3 from "web3";

export const getCustomTokenBalance = async (accAddress: string) => {
  const web3 = new Web3((window as any).ethereum);

  try {
    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      "0x8d1E1b97957DA2012E6a5E96C3af3aFEbf86D85E"
    );
    
    const name = await erc20Contract.methods.name().call();
    const symbol = await erc20Contract.methods.symbol().call();
    const decimals = await erc20Contract.methods.decimals().call();
    const totalSupply = await erc20Contract.methods.totalSupply().call();
    let balance = await erc20Contract.methods.balanceOf(accAddress).call();
    balance = (Web3 as any).utils.fromWei(balance);
    
    return { name, symbol, decimals, totalSupply, balance };
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