import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  number: string;
  label: string;
  title: string;
  description: string;
  badge?: string;
}

export function FeatureCard({
  number,
  label,
  title,
  description,
  badge,
}: FeatureCardProps) {
  return (
    <Card className="relative flex flex-col gap-4">
      {badge && (
        <div className="absolute top-6 right-6">
          <Badge variant="outline">{badge}</Badge>
        </div>
      )}
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
        <span>[{number}]</span>
        <span>{label}</span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
    </Card>
  );
}
