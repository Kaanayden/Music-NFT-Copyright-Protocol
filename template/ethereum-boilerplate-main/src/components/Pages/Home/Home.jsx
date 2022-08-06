import { useMoralis } from "react-moralis";
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Copyright from "../../images/copyright.jpg";
import "./Home.css";

export default function Home() {
  const { Moralis } = useMoralis();

  return (
    <div className="container">
      <div className="outer">
        <img src={Copyright}/>
        <div className="cover">
         <p className="description">Music NFT Copyright Protocol</p>
         <button className="moreinfo" onClick={()=>{window.open("https://github.com/Kaanayden/Music-NFT-Copyright-Protocol","_blank")}}>More Info</button>
        </div>
        <div className="inner">
          <div className="logo"></div>
        </div>
      </div>
    </div>
  );
}
