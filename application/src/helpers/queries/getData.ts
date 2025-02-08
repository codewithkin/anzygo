import axios from "axios";

async function getData(url: string, options?: any) {
    try {
        if(!options) {
            const res = await axios.get(url);
    
            return res;
        }
    
        const res = await axios.get(url, ...options);
    
        return res
    } catch (e: unknown) {
        console.log("An error occured while fetching data: ", e);
    }
}

export default getData
