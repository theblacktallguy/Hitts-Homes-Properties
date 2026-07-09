export type RequestTourData = {
    fullName: string;
    email: string;
    phone: string;

    propertyId: string;
    propertyTitle: string;
    propertyAddress: string;

    tourType: "in-person" | "virtual" | "";

    preferredDate: string;
    preferredTime: string;

    alternateDate: string;
    alternateTime: string;

    financingStatus: string;
    message: string;

    source: "property-page" | "general";
};