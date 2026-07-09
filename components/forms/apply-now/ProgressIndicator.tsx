type Props = {
    currentStep: number;
    totalSteps: number;
};

export default function ProgressIndicator({
    currentStep,
    totalSteps,
}: Props) {
    const progress =
        ((currentStep + 1) / totalSteps) * 100;

    return (
        <div>

            <div className="
            flex
            items-center
            justify-between
            text-sm
            text-neutral-500
            ">

                <span>
                    Step {currentStep + 1} of {totalSteps}
                </span>

                <span>
                    {Math.round(progress)}%
                </span>

            </div>


            <div className="
            mt-3
            h-2
            w-full
            overflow-hidden
            rounded-full
            bg-neutral-300
            ">

                <div
                    className="
                    h-full
                    rounded-full
                    bg-[#C8A45D]
                    transition-all
                    duration-300
                    "
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>
    );
}