import { useMoralis } from "react-moralis";
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Copyright from "../../images/copyright.jpg";
import Whatsapp from "../../images/whatsapp.png";
import Lock from "../../images/lock.jpg";
import zora from "../../images/zora.png";
import lit from "../../images/lit.png";
import nft from "../../images/nft.png";
import polygon from "../../images/polygon.png";
import kaan from "../../images/kaan.png";
import muhi from "../../images/muhi.png";
import "./Home.css";

export default function Home() {
  const { Moralis } = useMoralis();

  return (
    <div className="container">
      <div className="header">
        <img src={Copyright}/>
        <div className="cover">
         <p className="description">Music NFT Copyright Protocol</p>
         <button className="moreinfo" onClick={()=>{window.open("https://github.com/Kaanayden/Music-NFT-Copyright-Protocol","_blank")}}>More Info</button>
        </div>
      </div>
      <div className="inner">
          <br/>
          <div className="sponsor">
            <div className="logo"></div>
            <p>Sponsors</p>
            <div className="inner">
              <img src={zora}/>
              <img src={polygon}/>
              <img src={lit}/>
              <img src={nft}/>
            </div>
          </div>
          <p>More Description</p>
            <div className="animation">
              <img className="wp" src={Whatsapp}/>
              <img className="lock" src={Lock}/>
            </div>
          <br/>
          <p>More Description</p>
        </div>
        <div className="contact">
          <div className="kaan">
            <img src={kaan}/>
            <p>Kaan Aydeniz <br/> Linkedin
            </p>
          </div>
          <div className="muhittin">
            <img src={muhi}/>
          </div>
        </div>
    </div>
  );
}
