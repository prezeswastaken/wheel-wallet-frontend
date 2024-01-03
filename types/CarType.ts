import type { CarPhotoType } from "./CarPhotoType";

export type Car = {
  id: Number;
  model: String;
  owner_id: Number;
  coowner_id: Number;
  status: String;
  code: String;
  photos?: Array<CarPhotoType>;
  photo: CarPhotoType;
  created_at: String;
  updated_at: String;
};
