"use client";

import { SignIn } from "@clerk/nextjs";
import { useTranslation } from "@/i18n/useTranslation";
import { toast } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useClerk, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui";

function SignInPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signIn, setActive: setSignInActive, isLoaded } = useSignIn();

  const handleDemoLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "",
        password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "",
      });

      if (result.status === "complete") {
        setSignInActive({ session: result.createdSessionId });
        router.push("/chat");
      }

      toast.success(t("auth.demoLoginDescription"));
    } catch (error) {
      console.error("Error logging in as demo user:", error);
      toast.error(t("auth.errorDemoLogin"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t("auth.signInAccount")}
          </h2>
        </div>

        <div>
          <SignIn
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
            signUpUrl="/sign-up"
          />

          <Button
            className="w-full mt-4"
            onClick={handleDemoLogin}
          >
            Sign in as Demo User
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
