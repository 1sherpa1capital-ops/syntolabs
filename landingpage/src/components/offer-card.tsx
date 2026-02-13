import React from "react";

interface OfferCardProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  icon,
  title,
  description,
  badge,
}) => {
  return (
    <div className="relative p-6 border border-zinc-900 hover:border-zinc-800 rounded-sm transition-colors bg-zinc-950/50">
      {badge && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 font-medium">
          {badge}
        </span>
      )}

      <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
        <span className="font-mono text-sm font-semibold text-emerald-500">
          {icon}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-zinc-100 mb-3 leading-tight">
        {title}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default OfferCard;
