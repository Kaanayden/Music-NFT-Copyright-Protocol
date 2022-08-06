const nftStorageApiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;

export default async function uploadData(data) {
    const form = new FormData();
    form.append('meta', data);

    let result = await fetch('https://api.nft.storage/store', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + nftStorageApiKey,
        },
        body: form
    });


    let jsonData = await result.json();
    return jsonData;
}