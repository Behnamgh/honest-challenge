import tj from "@mapbox/togeojson";
import fs from "fs";
import { DOMParser } from "xmldom";
import { DeliveryArea } from "./models/DeliveryArea";

const deliveryAreasKml = new DOMParser().parseFromString(
    fs.readFileSync(__dirname + "/../../FullStackTest_DeliveryAreas.kml", "utf8")
);
const deliveryAreas = tj.kml(deliveryAreasKml);
const deliveryAreasPolygons = deliveryAreas.features.filter((data: any) => data.geometry.type === "Polygon");

export const initializeDatabase = async () => {
    return Promise.all(
        deliveryAreasPolygons.map(async (data: any) => {
            return DeliveryArea.updateOne({ name: data.properties.name }, data, { new: true, upsert: true });
        }),
    );
};