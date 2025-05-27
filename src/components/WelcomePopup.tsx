import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { useTranslation } from "@/i18n/useTranslation";
import {
  MessageSquare,
  Globe,
  Heart,
  MapPin,
  Sparkles,
  Languages,
} from "lucide-react";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    { code: "enUS" as const, label: "English" },
    { code: "deDE" as const, label: "Deutsch" },
    { code: "ruRU" as const, label: "Русский" },
  ];

  const features = [
    {
      title: t("chat.welcome.feature1.title"),
      description: t("chat.welcome.feature1.description"),
    },
    {
      title: t("chat.welcome.feature2.title"),
      description: t("chat.welcome.feature2.description"),
    },
  ];

  const getFeatureIcon = (index: number) => {
    const icons = [MessageSquare, Globe, Heart, MapPin];
    const Icon = icons[index] || Sparkles;
    return <Icon className="h-6 w-6 text-primary" />;
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold">
            {t("chat.welcome.title")}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {t("chat.welcome.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card  transition-colors"
              >
                <div className="flex-shrink-0 p-2 rounded-full bg-primary/10">
                  {getFeatureIcon(index)}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="p-4 hover:bg-accent hover:text-accent-foreground"
                aria-label="Toggle language"
              >
                <Languages size={20} />
                {t("chat.changeLanguage")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={
                    language === lang.code ? "bg-black text-white" : ""
                  }
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {t("chat.welcome.getStarted")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
