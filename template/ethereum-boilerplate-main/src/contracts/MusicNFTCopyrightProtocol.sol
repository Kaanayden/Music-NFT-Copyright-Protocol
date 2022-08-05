// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNFTCopyrightProtocol is ERC721, ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;


    mapping( address => uint ) public balances;


    struct UsageCopyright {
        address owner;
        bool isDataSet;
        string usedVideoDataUrl;
    }
    
    mapping( uint => MusicNFT ) public musicNFTs;

    struct MusicNFT {
        //usage copyright licenses
        UsageCopyright[] usageCopyrights;
        //to get usage copyright price
        uint copyrightPrice;
        //to check whether that address have license to view private music files
        mapping( address => bool ) doesHaveLicense;
    }

    event CopyrightPriceSet( uint indexed tokenId, uint newPrice );
    event UsageLicenseBought( uint indexed tokenId, address indexed buyer, uint copyrightId, uint price );
    event UsageLicenseDataSet( uint indexed tokenId, address indexed buyer, uint copyrightId, string videoDataUrl );

    constructor() ERC721("Music NFT Copyright Protocol", "MNCP") {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

//If copyright price is zero, this means that music nft is not selling usage copyright license.
    function setCopyrightPrice( uint tokenId, uint price ) public {
        require( ownerOf( tokenId ) == msg.sender, "not nft owner" );
        musicNFTs[tokenId].copyrightPrice = price;

        emit CopyrightPriceSet( tokenId, price );
    }

    function buyUsageLicense( uint tokenId ) external payable {
        //to establish gas optimization
        uint msgValue = msg.value;
        address msgSender = msg.sender;

        require( musicNFTs[tokenId].copyrightPrice != 0, "not allowed to sell usage copyrights" );
        require( msgValue >= musicNFTs[tokenId].copyrightPrice, "not enough value" );

        //current owner will receive the payment
        balances[ ownerOf( tokenId ) ] += msgValue;
        musicNFTs[tokenId].doesHaveLicense[ msgSender ] = true;
        UsageCopyright storage usageCopyright = musicNFTs[tokenId].usageCopyrights.push();
        usageCopyright.owner = msgSender;

        emit UsageLicenseBought( tokenId, msgSender, musicNFTs[tokenId].usageCopyrights.length - 1, msgValue );
    }

    //video data url can be set once, only first time
    function setUsedVideoData( uint tokenId, uint copyrightId, string calldata _videoDataUrl ) external {
        UsageCopyright memory usageCopyright = musicNFTs[tokenId].usageCopyrights[copyrightId];
        require( usageCopyright.owner == msg.sender, "not owner of this usage copyright" );
        require( usageCopyright.isDataSet == false, "url already set" );

        musicNFTs[tokenId].usageCopyrights[copyrightId].isDataSet = true;
        musicNFTs[tokenId].usageCopyrights[copyrightId].usedVideoDataUrl = _videoDataUrl;

        emit UsageLicenseDataSet( tokenId, msg.sender, copyrightId, _videoDataUrl );
    }

    //checks whether has usage license to access private files via Lit protocol
    function checkLicense( uint tokenId ) external view returns( bool ) {
        return musicNFTs[tokenId].doesHaveLicense[ msg.sender ];
    }

    //checks whether has all licenses of nft to access private files for owner of NFT via Lit protocol
    function isOwner( uint tokenId ) external view returns( bool ) {
        return ( ownerOf( tokenId ) == msg.sender );
    }

    //checks given address whether has usage license to access private files via Lit protocol
    function checkLicenseWithAddress( uint tokenId, address _address ) external view returns( bool ) {
        return musicNFTs[tokenId].doesHaveLicense[ _address ];
    }

    //checks given address whether has all licenses of nft to access private files for owner of NFT via Lit protocol
    function isOwnerWithAddress( uint tokenId, address _address ) external view returns( bool ) {
        return ( ownerOf( tokenId ) == _address );
    }

    function getUsageCopyrights( uint tokenId ) external view returns ( UsageCopyright[] memory ) {
        return musicNFTs[tokenId].usageCopyrights;
    }

    function withdraw() external {
        address receiver = msg.sender;
        uint balance = balances[receiver];
        require( balance > 0, "no balance" );
        balances[receiver] = 0;
        payable(receiver).transfer( balance );
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}