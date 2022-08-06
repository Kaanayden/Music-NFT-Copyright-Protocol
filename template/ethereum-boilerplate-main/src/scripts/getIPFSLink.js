export default function getIPFSLink(cid) {
    let text = cid;
    text = "https://nftstorage.link/ipfs/" + text.substring(7);
    return text;
}

