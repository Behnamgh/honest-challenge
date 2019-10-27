import NodeGeocoder from "node-geocoder";
import inside from "point-in-polygon";
import tj from "@mapbox/togeojson";
import fs from "fs";
import { DOMParser } from "xmldom";

const deliveryAreasKml = new DOMParser().parseFromString(
    fs.readFileSync(__dirname + "/../../FullStackTest_DeliveryAreas.kml", "utf8")
);
const deliveryAreas = tj.kml(deliveryAreasKml);
const deliveryAreasPolygons = deliveryAreas.features.filter((data: any) => data.geometry.type === "Polygon");

const geocoder = NodeGeocoder({
    provider: "opencage",
    apiKey: process.env.MAP_KEY || "e24493f6449d4ce4b61b877c505e684a",
});



/**
* Convert the adress as a string to plain corrdinates
*
* @param {String} adressName
*/
export const getOutlet = async (addressName: string) => {
    const [addressCoordinates] = await geocoder.geocode(addressName);
    if (!addressCoordinates) {
        throw new Error("address not found");
    }
    const firstMatch = [addressCoordinates.longitude || 0, addressCoordinates.latitude || 0];
    const result = deliveryAreasPolygons.find((placeMark: any) => {
        const [polygon] = placeMark.geometry.coordinates;
        return inside(firstMatch, polygon);
    });
    if(!result || !result.properties){
        throw new Error("polygen not found");

    }
    return result.properties;
};
