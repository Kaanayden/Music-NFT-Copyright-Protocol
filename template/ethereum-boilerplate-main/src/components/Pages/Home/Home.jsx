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
        <p>Lorem ipsum dolor sit amet, esse impetus argumentum no vix, exerci nostrum pri an. Ea malorum omittantur his, bonorum epicuri neglegentur mea ea, te vis sale primis deseruisse. Eos at summo ponderum accusata, te nec timeam delicatissimi, nam et ipsum eligendi efficiantur. Ne est audiam utamur adversarium, pri ea populo doming.Ei mel inani integre maiestatis. At pro tota scaevola vulputate, te omnes propriae eam. Te utroque commune has. Periculis democritum quo ut, unum postea laoreet at mel.
        </p>
        <div className="animation">
          <img className="wp" src={Whatsapp} />
          <img className="lock" src={Lock} />
        </div>
        <br />
        <p>Vim at quot lucilius, ex eum iusto voluptatum. Quot complectitur vel ut, mei te eros nonumes inciderint. Cu eam constituto intellegebat, ex iuvaret eleifend pericula nec, esse ignota noluisse eu pro. Commodo consectetuer ius ne. Ut purto nobis verterem sea.Ei mel inani integre maiestatis. At pro tota scaevola vulputate, te omnes propriae eam. Te utroque commune has. Periculis democritum quo ut, unum postea laoreet at mel.
        </p>
      </div>
    </div>
  );
}
