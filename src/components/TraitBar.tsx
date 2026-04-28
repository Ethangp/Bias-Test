import { TRAIT_LABELS, TRAIT_DESCRIPTIONS, TraitKey } from "@/lib/quizData";

interface TraitBarProps {
  trait: TraitKey;
  score: number;
  count: number;
}

function getTraitLevel(normalizedScore: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (normalizedScore >= 70) {
    return {
      label: "Strong",
      color: "bg-green-500",
      bg: "bg-green-50",
    };
  } else if (normalizedScore >= 40) {
    return {
      label: "Moderate",
      color: "bg-yellow-400",
      bg: "bg-yellow-50",
    };
  } else {
    return {
      label: "Low",
      color: "bg-gray-300",
      bg: "bg-gray-50",
    };
  }
}

export default function TraitBar({ trait, score, count }: TraitBarProps) {
  // Normalize: score range is roughly -count*5 to +count*5
  // Map to 0-100 display scale
  const maxPossible = count * 5;
  const normalized =
    maxPossible > 0
      ? Math.max(0, Math.min(100, ((score + maxPossible) / (2 * maxPossible)) * 100))
      : 50;

  const { label, color } = getTraitLevel(normalized);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-800">
            {TRAIT_LABELS[trait]}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            {TRAIT_DESCRIPTIONS[trait]}
          </p>
        </div>
        <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{label}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}
