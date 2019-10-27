import NodeGeocoder from "node-geocoder";

import { DeliveryArea } from "../database/models/DeliveryArea";


const geocoder = NodeGeocoder({
    provider: "opencage",
    apiKey: process.env.MAP_KEY || "e24493f6449d4ce4b61b877c505e684a",
});



/**
* Convert the address as a string to plain coordinates
*
* @param {String} addressName
*/
export const getOutlet = async (addressName: string) => {
    const [addressCoordinates] = await geocoder.geocode(addressName);
    if (!addressCoordinates) {
        throw new Error("address not found");
    }
    const firstMatch = [addressCoordinates.longitude || 0, addressCoordinates.latitude || 0];
    const result = await DeliveryArea.findOne({
        geometry: {
          $geoIntersects: {
            $geometry: { type: "Point", coordinates: firstMatch }
          },
        },
      });
    if (!result) {
        throw new Error("polygen not found");
    }
    return result;
};
