type FormNavigationProps = {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onBack: () => void;
    isSubmitting?: boolean;
};


export default function FormNavigation({
    currentStep,
    totalSteps,
    onNext,
    onBack,
    isSubmitting = false,
}: FormNavigationProps) {
    return (
        <div className="
        flex
        justify-between
        items-center
        mt-12
        ">

            <button
                type="button"
                onClick={onBack}
                disabled={currentStep === 0 || isSubmitting}
                className="
                text-sm
                text-black
                disabled:opacity-30
                transition
                "
            >
                ← Back
            </button>


            <button
                type="button"
                onClick={onNext}
                disabled={isSubmitting}
                className="
                rounded-full
                bg-[#0B1F3A]
                px-8
                py-3
                text-white
                text-sm
                font-medium
                transition
                hover:scale-105
                hover:shadow-lg
                disabled:opacity-60
                disabled:hover:scale-100
                disabled:hover:shadow-none
                "
            >
                {currentStep === totalSteps - 1
                    ? isSubmitting
                        ? "Submitting..."
                        : "Submit Application"
                    : "Continue"}
            </button>

        </div>
    );
}