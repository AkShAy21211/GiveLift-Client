"use client"

interface HeroButtonProps {
  className: string;
  label: string;
  onClick: () => void;
}

const HeroButton = ({ className, onClick, label }: HeroButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default HeroButton;
