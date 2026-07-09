export type PropertyRequestData = {

  fullName: string;
  email: string;
  phone: string;

  lookingFor: "rent" | "buy" | "";

  state: string;
  city: string;
  neighborhood: string;
  openToSuggestions: boolean;


  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];

  minBudget: string;
  maxBudget: string;

  timeline: string;
  message: string;

};