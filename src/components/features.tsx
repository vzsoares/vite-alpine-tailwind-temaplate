interface Feature {
    icon: string;
    title: string;
    description: string;
}

const FEATURES: Feature[] = [
    {
        icon: "https://vitejs.dev/logo.svg",
        title: "Vite",
        description:
            "Lightning fast development server and optimized builds with hot module replacement and true ESM support.",
    },
    {
        icon: "https://alpinejs.dev/favicon.png",
        title: "Alpine.js",
        description:
            "Minimal JavaScript framework for adding interactive behavior to your markup with simple directives.",
    },
    {
        icon: "https://tailwindcss.com/favicons/apple-touch-icon.png",
        title: "Tailwind CSS",
        description:
            "Utility-first CSS framework for rapidly building custom user interfaces without leaving your HTML.",
    },
];

/** A single feature card — demonstrates a JSX component taking props. */
function FeatureCard({ icon, title, description }: Feature): JSX.Element {
    return (
        <div class="p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
            <div class="flex items-center mb-4">
                <img src={icon} alt={title} class="h-8 w-8 mr-3" />
                <h3 safe class="text-xl font-semibold">
                    {title}
                </h3>
            </div>
            <p safe class="opacity-80">
                {description}
            </p>
        </div>
    );
}

/** Features section — maps the data array to FeatureCard components. */
export function Features(): JSX.Element {
    return (
        <div class="py-16 px-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    {FEATURES.map((feature) => (
                        <FeatureCard {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
