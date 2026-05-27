interface Feature {
    icon: string;
    title: string;
    description: string;
}

// `icon` is a filename under public/logos (bundled locally, not hot-linked).
const FEATURES: Feature[] = [
    {
        icon: "vite.svg",
        title: "Vite",
        description:
            "Lightning fast development server and optimized builds with hot module replacement and true ESM support.",
    },
    {
        icon: "alpine.svg",
        title: "Alpine.js",
        description:
            "Minimal JavaScript framework for adding interactive behavior to your markup with simple directives.",
    },
    {
        icon: "tailwind.svg",
        title: "Tailwind CSS",
        description:
            "Utility-first CSS framework for rapidly building custom user interfaces without leaving your HTML.",
    },
];

/** A single feature card — demonstrates a JSX component taking props. */
function FeatureCard({ icon, title, description }: Feature): JSX.Element {
    return (
        <div class="card bg-base-100 border border-base-300 transition-shadow hover:shadow-lg">
            <div class="card-body">
                <h3 class="card-title">
                    <img src={icon} alt={title} class="h-8 w-8" />
                    <span safe>{title}</span>
                </h3>
                <p safe class="opacity-80">
                    {description}
                </p>
            </div>
        </div>
    );
}

/** Features section — maps the data array to FeatureCard components. */
export function Features({ base }: { base: string }): JSX.Element {
    return (
        <div class="py-16 px-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    {FEATURES.map((feature) => (
                        <FeatureCard
                            {...feature}
                            icon={`${base}logos/${feature.icon}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
