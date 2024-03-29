import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import { Design } from "../pages/design";
import { Tranfer } from "../pages/tranfer";
import { Information } from "../pages/information";
import NFTList from "../pages/nft-list";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/tranfer" element={<Tranfer />} />
      <Route path="/design" element={<Design />} />
      <Route path="/nft" element={<NFTList />} />
      <Route path="*" element={<Information />} />
    </Switch>
  );
};

export default Routes;
