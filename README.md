# Music NFT Copyright Protocol
 
Buying a copyright is both long and troublesome process for the content creator and user. Our project offers completely new, fast and easy approch for copyrights.

This project's browser based frontend part allows user to sell or buy nfts and their copyrights. Users also mint their nfts on Polygon. To mint a NFT user must upload their NFT's name, description, image and sound files to ipfs via nft.storage. After minting their NFT's or buying any NFT, our smart contract gives user to set copyright prices permission for that NFT. The user who own the copyright for any NFT must upload the part of their project, video or sound that use the NFT. Contents that are using a NFT's copyrights are shown on the NFT page. In our marketplace every transaction happens via Zora protocol. User can only reach the preview sound file until buy an NFT or buy it's copyrights. After buying a copyright, our system allows user to reach the full sound files with the help of Lit Protocol.

Marketplace Page:

 In this page selling NFTs's are shown. User can go to NFT's own page by clicking them. The page that is opened has NFT's metadata, image and sound allows user to buy the NFT or it's copyrights.
 
 My NFT's Page:
 
  In this page user can see their NFT's and sell them or set their copyright prices.
  
NFT Minting:

```ruby
const handleClick = async () => {
    let data = {};
    data.name = name;
    data.description = description;
    data.imageFileUrl = imageIpfs.ipfsGatewayUrl;
    data.audioFileUrl = audioIpfs.ipfsGatewayUrl;
    data.tokenId = 5;
    let metadata = NFTMetadataGenerator(data);
    setPending(true);
    let result = await uploadData(JSON.stringify(metadata));
    setResult(result);
  }
```
  
# Which Techonologys Used

This project uses @zora, @litprotocol, @NFT.storage and @polygon. We have uploaded our smart contract to polygon. Zora ensured that we can sell or buy the nfts and their copyrights. By the Lit Protocol users who own copyrights reach the decryripted full files of NFTs' in an easy way. To reach the NFT data's and metadata's on ipfs we have used as the best way nft.storage.

Zora used in:

NFT.storage used in:

Lit Protocol used in:

Polygon used in:



