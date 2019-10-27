import mongoose from "mongoose";
import "mongoose-geojson-schema";

export type DeliveryAreaDocument = mongoose.Document & {
  name: string;
  properties: {
    name: string;
  };
  geometry: any;
};

const deliveryAreaSchema = new mongoose.Schema({
  name: String,
  properties: {
    name: String,
  },
  geometry: mongoose.Schema.Types.Polygon
});

export const DeliveryArea = mongoose.model<DeliveryAreaDocument>(
  "DeliveryArea",
  deliveryAreaSchema
);
