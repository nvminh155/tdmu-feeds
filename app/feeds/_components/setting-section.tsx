import { Label } from "@/components/ui/label";

interface SettingSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingSection = ({
  title,
  description,
  children,
}: SettingSectionProps) => {
  return (
    <div>
      <div className="mb-4 flex flex-col">
        <Label className="text-lg font-semibold">{title}</Label>
        <Label className="text-xs font-normal text-muted-foreground">
          {description}
        </Label>
      </div>
      {children}
    </div>
  );
};

export default SettingSection;
