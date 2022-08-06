import { Web3Storage } from 'web3.storage'

const token = process.env.REACT_APP_WEB3_STORAGE_API_KEY;
const client = new Web3Storage({ token })

export default async function uploadWithWeb3Storage(file) {
    const files = [];
    files.push(file);
    const cid = await client.put(files)
    return cid;
}