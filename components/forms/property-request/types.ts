import { FormErrors } from "./formErrors";
import { PropertyRequestData } from "./formTypes";

export type PropertyStepProps = {
    formData: PropertyRequestData;

    errors: FormErrors;

    onChange: (
        field: keyof PropertyRequestData,
        value: PropertyRequestData[keyof PropertyRequestData]
    ) => void;
};
