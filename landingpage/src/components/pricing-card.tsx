import { cn } from "@/lib/utils";

function CheckIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  ctaText?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  badge,
  highlighted = false,
  ctaText = "Book Build",
}: PricingCardProps) {
  return (
    <div
       className={cn(
         "relative flex flex-col rounded-sm p-8",
         highlighted
           ? "border-2 border-accent"
           : "border border-zinc-900"
       )}
      >
      {badge && (
        <div className="absolute right-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-medium text-zinc-950">
          {badge}
        </div>
      )}

      <h3 className="text-lg font-medium">{name}</h3>

      <div className="mt-6">
        <span className="text-4xl font-medium tracking-tight">{price}</span>
      </div>

      <p className="mt-1 text-sm text-zinc-500">{description}</p>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-accent" strokeWidth={2} />
            </div>
            <span className="text-sm text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "mt-8 w-full px-6 py-4 text-sm font-medium transition-all duration-200 rounded-full",
          highlighted
            ? "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
            : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50"
        )}
      >
        {ctaText}
      </button>
    </div>
  );
}
