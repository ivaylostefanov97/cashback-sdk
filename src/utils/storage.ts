import { ThirdwebStorage } from "@thirdweb-dev/storage";


const fs = require('fs');

const storage = new ThirdwebStorage({
    gatewayUrls: [
        "https://gateway.pinata.cloud/ipfs/",
        "https://gateway.ipfscdn.io/ipfs/",
        "https://cloudflare-ipfs.com/ipfs/",
        "https://ipfs.io/ipfs/",
        "https://ipfs.scalaproject.io/ipfs/",
        "https://w3s.link/ipfs/",
        "https://nftstorage.link/ipfs/",
        "https://ipfs.fleek.co/ipfs/"
    ]
});

export const uploadJSON = async (data: Record<string, any>) => {
    const uri = await storage.upload(data);
    
    fs.writeFileSync('C:\\Users\\Ivo\\Documents\\ETHLisbon\\cashback-sdk\\dist\\src\\utils\\cache.json', JSON.stringify( { [uri]: data }, null, 4) , (err: any) => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

    return uri;
}

export const downloadJSON = async (uri: string) => {

    const dataJson = require('./cache.json');

    if (dataJson && typeof dataJson === "object" && dataJson[uri]) {
        return dataJson[uri]
    }

    const data = await storage.download(uri);
    return await data.json();
}