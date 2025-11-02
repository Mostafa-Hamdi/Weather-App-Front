import * as Icons from "lucide-react";

interface MetricCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtitle?: string;
  gradient?: string;
  iconColor: string;
  borderColor?: string;
  valueColor?: string;
  customBg?: boolean;
}

function MetricCard({
  icon,
  label,
  value,
  subtitle,
  gradient,
  iconColor,
  borderColor,
  valueColor = "text-gray-800",
  customBg = false,
}: MetricCardProps) {
  const IconComponent = Icons[
    icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string; size?: number }>;

  const content = (
    <>
      <IconComponent className={`${iconColor} mb-3`} size={28} />
      <div className="text-sm text-gray-600 font-medium mb-1">{label}</div>
      <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
      {subtitle && <div className="text-sm text-gray-600 mt-1">{subtitle}</div>}
    </>
  );

  if (customBg) {
    return content;
  }

  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-5 border ${borderColor}`}
    >
      {content}
    </div>
  );
}
export default MetricCard;
