interface GradientDividerProps {
  className?: string;
}

const GradientDivider = ({ className = '' }: GradientDividerProps) => {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(32,224,150,0.4) 50%, transparent 100%)',
      }}
    />
  );
};

export default GradientDivider;
