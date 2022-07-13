import { FC } from "react";

import "./Traits.css";

import { TraitData } from "../model";

interface TraitsProps {
  traits: TraitData[];
}

const Traits: FC<TraitsProps> = ({ traits }) => {
  return (
    <div className="traits">
      {traits.map(({ trait, rarity, value }) => (
        <div key={trait} className="traits-item">
          <p>{trait}</p>
          <p className="traits-value">{value}</p>
          <p>{rarity}</p>
        </div>
      ))}
    </div>
  );
};

export default Traits;
