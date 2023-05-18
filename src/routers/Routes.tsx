import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import { Information } from "../pages/information";
import { Tranfer } from "../pages/tranfer";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/tranfer" element={<Tranfer />} />
      <Route path="*" element={<Information />} />
    </Switch>
  );
};

export default Routes;
