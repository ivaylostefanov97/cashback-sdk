import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage();

export const uploadJSON = async (data: Record<string, any>) => {
    const uri = await storage.upload(data);
    return uri;
}

export const downloadJSON = async (uri: string) => {
    const data = await storage.download(uri);
    return data;
}