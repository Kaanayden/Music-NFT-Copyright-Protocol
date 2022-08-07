import { useMoralis } from "react-moralis";
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Copyright from "../../images/copyright.jpg";
import Whatsapp from "../../images/whatsapp.png";
import Lock from "../../images/lock.png";
import zora from "../../images/zora.png";
import lit from "../../images/lit.png";
import nft from "../../images/nft.png";
import polygon from "../../images/polygon.png";
import "./Home.css";

export default function Home() {
  const { Moralis } = useMoralis();

  return (
    <div className="container">
      <div className="header">
        <img src={Copyright} />
        <div className="cover">
          <p className="description">Music NFT Copyright Protocol</p>
          <button className="moreinfo" onClick={() => { window.open("https://github.com/Kaanayden/Music-NFT-Copyright-Protocol", "_blank") }}>Source Code</button>
        </div>
      </div>
      <div className="inner">
        <br />
        <div className="sponsor">
          <div className="logo"></div>
          <p>Sponsors</p>
          <div className="border"></div>
          <div className="inner">
            <a href="https://zora.co/"><img src={zora} /></a>
            <a href="https://polygon.technology/"><img src={polygon} /></a>
            <a href="https://litprotocol.com/"><img src={lit} /></a>
            <a href="https://nft.storage/"><img src={nft} /></a>
          </div>
        </div>
        <p className="xx">Buying a copyright is both long and troublesome process for the content creator and user. Our project offers completely new, fast and easy approch for copyrights. This project's browser based frontend part allows user to sell or buy nfts and their copyrights. Users also mint their nfts on Polygon. To mint a NFT user must upload their NFT's name, description, image and sound files to ipfs via nft.storage. After minting their NFT's or buying any NFT, our smart contract gives user to set copyright prices permission for that NFT. The user who own the copyright for any NFT must upload the part of their project, video or sound that use the NFT. Contents that are using a NFT's copyrights are shown on the NFT page. In our marketplace every transaction happens via Zora protocol. User can only reach the preview sound file until buy an NFT or buy it's copyrights. After buying a copyright, our system allows user to reach the full sound files with the help of Lit Protocol. 
        </p>
        <div className="animation">
          <img className="wp" src={Whatsapp} />
          <img className="lock" src={Lock} />
        </div>
        <br />
        <p className="xx">This project uses @zora, @litprotocol, @NFT.storage and @polygon. We have uploaded our smart contract to polygon. Zora ensured that we can sell or buy the nfts and their copyrights. By the Lit Protocol users who own copyrights reach the decryripted full files of NFTs' in an easy way. To reach the NFT data's and metadata's on ipfs we have used as the best way nft.storage.
        </p>
      </div>
    </div>
  );
}
