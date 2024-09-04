import { TimedDisplay } from "./TimedDisplay";

export default function Header() {
    return (
        <header className="flex h-14 lg:h-[60px] justify-between gap-4 border-b bg-gray-800/40 px-4">
            <div className="flex h-[60px] items-center">
                {/* HEADER WITH ICON */}
                <a
                    className="flex items-center justify-between gap-2 font-semibold"
                    href="#"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        strokeMiterlimit="10"
                        viewBox="168.45 160.8 786.1 750.4"
                        fillRule="nonzero"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M706.763 591.198C487.108 734.611 271.782 630.654 245.675 587.593C245.675 587.593 243.241 461.371 286.977 398.907C286.977 398.907 275.227 359.998 297.734 311.221C297.734 311.221 344.121 303.407 386.147 325.166C386.147 325.166 475.02 281.754 586.899 316.732C586.899 316.732 651.192 275.357 707.316 275.891C707.316 275.891 722.547 343.267 712.65 381.429C712.65 381.429 732.389 410.685 740.274 448.182C740.274 448.182 912.349 523.818 832.191 757.558C832.191 757.558 785.408 768.211 763.526 760.355C763.526 760.355 791.888 714.947 793.129 609.486C793.129 609.486 793.62 771.895 723.623 803.366C723.623 803.366 651.23 813.887 622.556 801.725C622.556 801.725 617.352 726.491 619.536 708.958L619.295 742.611C619.295 742.611 474.538 748.03 421.751 699.374L451.38 718.183C454.827 763.896 427.123 789.498 427.123 789.498C427.123 789.498 348.064 794.96 337.774 788.237C337.774 788.237 312.613 771.607 296.482 625.491"
                            fill="none"
                            stroke="#67d78e"
                            strokeWidth="22"
                        />
                    </svg>
                    <span className="">Notes</span>

                    <div className="flex items-center text-xs text-gray-500 px-2">
                        <TimedDisplay />
                    </div>
                </a>
            </div>



            <div className="ml-auto flex items-center">
                <div className="relative">
                    <input
                        className="h-10 rounded-md border border-gray-800 bg-transparent p-2 text-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-950"
                        placeholder="Search notes..."
                        type="search"
                    />
                </div>
            </div>
        </header>
    );
}
