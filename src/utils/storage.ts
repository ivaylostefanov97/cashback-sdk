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

export const uploadBatchJSON = async (jsonArray: any[]) => {
    const uris = await storage.uploadBatch(
        jsonArray,
        {
            alwaysUpload: false, // Optionally, always reupload even if the file already exists
            onProgress: (progress) => { }, // Callback that gets triggered when file upload progresses
            metadata: {}, // Optional metadata to associate with this upload
            rewriteFileNames: undefined, // If specified, will rewrite file names to numbers for use on-chain. Useful to use with NFT contracts that map token IDs to files.
            uploadWithGatewayUrl: false, // If specified, any URLs with schemes will be replaced with resolved URLs before upload
            uploadWithoutDirectory: false, // If specified, will upload a single file without wrapping it in a directory
        },
    );

    console.log("uris: ", uris)
    return uris
}

export const uploadJSON = async (data: Record<string, any>) => {
    const uri = await storage.upload(data);

    fs.writeFileSync('C:\\Users\\Ivo\\Documents\\ETHLisbon\\cashback-sdk\\dist\\src\\utils\\cache.json', JSON.stringify({ [uri]: data }, null, 4), (err: any) => {
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