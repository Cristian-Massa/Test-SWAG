interface BadgeProps {
  label: string;
}

export const Badge = ({ label }: BadgeProps) => (
  <span className="status-badge status-active l1">{label}</span>
);
