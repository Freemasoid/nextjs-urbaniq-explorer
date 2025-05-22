"use client";

import { SignUp } from "@clerk/nextjs";
import { useTranslation } from "@/i18n/useTranslation";

function SignUpPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t("auth.createAccount")}
          </h2>
        </div>
        <div>
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-card shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "bg-card border border-input text-foreground hover:bg-accent",
                socialButtonsBlockButtonText: "text-foreground",
                socialButtonsBlockButtonArrow: "hidden",
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                footerActionLink: "text-primary hover:text-primary/90",
                formFieldLabel: "text-foreground",
                formFieldInput:
                  "border-input bg-background text-foreground focus:border-ring focus:ring-ring/50",
              },
            }}
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
