import { useState, useEffect } from "react";
import Moralis from 'moralis';
import "./styles.scss";

const addressList = {
  eth: '0x1A92f7381B9F03921564a437210bB9396471050C',
  polygon: '0xfbe3AB0cbFbD17d06bdD73aA3F55aaf038720F59'
}

const NFTList = () => {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("0x1");
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);

  function getImgUrl(metadata) {
    if (!metadata) return;

    let meta = JSON.parse(metadata);

    if (!meta.image) return;

    if (!meta.image.includes("ipfs://")) {
      return meta.image;
    } else {
      return "https://ipfs.io/ipfs/" + meta.image.substring(7);
    }
  }

  async function fetchNFTs() {
    try {
      const response = await Moralis.EvmApi.nft.getContractNFTs({
        chain: chain,
        limit: 20,
        cursor: cursor,
        address: address,
      });

      let n = NFTs;
      setNFTs(n.concat(response.raw.result));
      setCursor(response.raw.cursor);
      console.log(response.raw);
    } catch (e) {
      console.error(e);
    }
  }

  function addressChange(e) {
    setAddress(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  function chainChange(e) {
    setChain(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  return (
    <>
      {/* <img src={moralis} alt="moralis" className="moralis" /> */}
      <div className="nft-list">
        <div style={{ fontSize: "23px", fontWeight: "700" }}>
          Get NFTs by contract
        </div>
        <button className="bu" onClick={fetchNFTs}>
          Get NFT's
        </button>
        <div className="inputs">
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Contract:</div>
            <input
              className="input"
              value={address}
              onChange={(e) => addressChange(e)}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Chain:</div>
            <select className="input" onChange={(e) => chainChange(e)}>
              <option value="0x1">Ethereum</option>
              <option value="0x38">Bsc</option>
              <option value="0x89">Polygon</option>
              <option value="0xa86a">Avalanche</option>
            </select>
          </div>
        </div>
        {NFTs.length > 0 && (
          <>
            <div className="results">
              {NFTs?.map((e, i) => {
                return (
                  <div style={{ width: "84px" }} key={i}>
                    <img
                      loading="lazy"
                      width={70}
                      src={getImgUrl(e.metadata)}
                      alt={`${i}image`}
                      style={{ borderRadius: "5px", marginTop: "10px" }}
                    />
                    <div style={{ fontSize: "10px" }}>
                      {`${e.name}\n${e.token_id}`}
                    </div>
                  </div>
                );
              })}
            </div>
            {cursor && (
              <>
                <button className="bu" onClick={fetchNFTs}>
                  Load More
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NFTList;
