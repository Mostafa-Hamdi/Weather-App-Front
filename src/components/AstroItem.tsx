function AstroItem({ icon: Icon, iconColor, label, value }: any) {
  return (
    <div className="text-center">
      <Icon className={`${iconColor} mx-auto mb-2`} size={32} />
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  );
}
export default AstroItem;
