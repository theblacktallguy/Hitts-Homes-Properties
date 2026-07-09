export type PropertyType =
  | "single_family"
  | "condo"
  | "townhome"
  | "apartment"
  | "duplex"
  | "manufactured"
  | "land";

export type Property = {
  id: string;
  propertyId: string;
  imageFolder: string;
  imageCount: number;

  title: string;

  price: number;

  beds: number;
  baths: number;
  sqft?: number | null;

  type: PropertyType;

  status: "rent" | "sale";

  address: string;
  city: string;
  state: string;

  images: string[];
};
