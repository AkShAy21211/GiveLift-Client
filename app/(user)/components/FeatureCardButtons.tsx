"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  List, 
  MapPin, 
  Droplets, 
  DollarSign, 
  History, 
  Flag, 
  CheckCircle, 
  Eye 
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonConfig {
  icon: string;
  label: string;
  href: string;
}

interface FeatureCardButtonsProps {
  buttons: ButtonConfig[];
}

const iconMap = {
  Plus,
  List,
  MapPin,
  Droplets,
  DollarSign,
  History,
  Flag,
  CheckCircle,
  Eye,
};

const FeatureCardButtons: React.FC<FeatureCardButtonsProps> = ({ buttons }) => {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      {buttons.map((button, index) => {
        const IconComponent = iconMap[button.icon as keyof typeof iconMap];
        return (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleClick(button.href)}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {button.label}
          </Button>
        );
      })}
    </>
  );
};

export default FeatureCardButtons;