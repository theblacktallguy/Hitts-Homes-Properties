type Props = {
    currentStep: number;
    totalSteps: number;
};


export default function ProgressIndicator({
    currentStep,
    totalSteps,
}: Props) {

    return (
        <div>

            <div className="
            flex
            justify-between
            items-center
            mb-5
            ">

                <p className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-neutral-500
                ">
                    Property Concierge
                </p>


                <p className="
                text-sm
                text-neutral-500
                ">
                    Step {currentStep + 1} of {totalSteps}
                </p>

            </div>


            <div className="
            flex
            gap-2
            ">

                {Array.from({
                    length: totalSteps
                }).map((_, index) => (

                    <div
                        key={index}
                        className={`
                        h-1
                        flex-1
                        rounded-full
                        transition-all
                        duration-500

                        ${
                            index <= currentStep
                            ? "bg-[#C8A45D]"
                            : "bg-neutral-200"
                        }
                        `}
                    />

                ))}

            </div>

        </div>
    );
}