export type ApplyNowData = {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    currentAddress: string;
    preferredContactMethod: "phone" | "email" | "text" | "";

    propertyId: string;
    propertyTitle: string;
    propertyAddress: string;
    desiredMoveInDate: string;
    leaseTerm: string;
    source: "property-page" | "general";

    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    monthlyIncome: string;
    employmentLength: string;
    additionalIncome: string;

    landlordName: string;
    landlordContact: string;
    currentMonthlyRent: string;
    timeAtCurrentAddress: string;
    reasonForMoving: string;

    occupants: string;
    hasPets: "yes" | "no" | "";
    petDetails: string;
    vehicles: string;

    hasEviction: "yes" | "no" | "";
    hasBankruptcy: "yes" | "no" | "";
    willSmoke: "yes" | "no" | "";
    consentToScreening: boolean;

    idFront: File | null;
    idBack: File | null;
    ssnFront: File | null;
    verificationConsent: boolean;

    message: string;
};