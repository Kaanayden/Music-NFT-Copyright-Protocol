import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains/Chains";



import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Home from "components/Pages/Home/Home";
import MarketPlace from "components/Pages/MarketPlace/MarketPlace";
import ShowNFT from "components/Pages/ShowNFT/ShowNFT";
import Muhi from "components/Pages/Muhi/Muhi";

import Text from "antd/lib/typography/Text";

import MenuItems from "./components/MenuItems";
import Test from "components/Test";
import MintNFT from "components/MintNFT/MintNFT";
import MyWallet from "components/Pages/MyWallet/MyWallet";
import logo from "components/images/lock.png";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <img style={{width:"64px"}} src={logo}/>
          <MenuItems />
          <div style={styles.headerRight}>
            {isAuthenticated && <MintNFT />}
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            
            <Route path="/marketplace">
              <MarketPlace />
            </Route>
            <Route path="/mynfts">
              <MyWallet />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/nft/:id">
              <ShowNFT />
            </Route>
            <Route path="/mintNFT">
              <MintNFT />
            </Route>
            <Route path="/muhi">
              <Muhi/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          🙋 You have questions? Ask them on the {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Kaanayden/Music-NFT-Copyright-Protocol/issues"
          >
            GitHub
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          📖 Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Kaanayden/Music-NFT-Copyright-Protocol/blob/main/README.md"
          >
            MNCP
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export default App;
