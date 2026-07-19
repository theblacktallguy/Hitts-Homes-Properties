import { RequestTourData } from "./formTypes";
import { FormErrors } from "./formErrors";

export type RequestTourStepProps = {
    formData: RequestTourData;
    errors: FormErrors;
    onChange: (
        field: keyof RequestTourData,
        value: RequestTourData[keyof RequestTourData]
    ) => void;
};
