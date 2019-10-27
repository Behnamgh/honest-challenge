import { Request, Response } from "express";
import { getOutlet } from "../utils/geoHelper";

export const findOutlet = async (req: Request, res: Response) => {
   try {
      const result = await getOutlet(req.body.address);
      return res.send(result);
   } catch (error) {
      console.log(["error hapend", error]);
      res.status(204).send(error);
   }
};
