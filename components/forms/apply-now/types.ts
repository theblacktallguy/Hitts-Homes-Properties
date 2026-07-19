import { ApplyNowData } from "./formTypes";
import { FormErrors } from "./formErrors";

export type ApplyNowStepProps = {
    formData: ApplyNowData;
    errors: FormErrors;
    onChange: (
        field: keyof ApplyNowData,
        value: ApplyNowData[keyof ApplyNowData]
    ) => void;
};
