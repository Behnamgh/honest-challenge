import axios from "axios";


/**
* Convert the adress as a string to plain corrdinates
*
* @param {String} adressName
*/
export const getOutlet = async (address: string) => {
    const result = await axios.post(
        `/geo/findOutlet`, { address }
    );
    return result;
};
