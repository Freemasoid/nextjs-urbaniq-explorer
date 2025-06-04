"use client";

import { SignIn } from "@clerk/nextjs";
import { useTranslation } from "@/i18n/useTranslation";
import { toast } from "@/components/ui";
import { useSearchParams, useRouter } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui";

function SignInPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    signIn,
    setActive: setSignInActive,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();

  // Determine if the entire page is ready to be displayed
  const isPageReady = isSignInLoaded && isAuthLoaded;

  // Redirect if already signed in
  if (isPageReady && isSignedIn) {
    const redirectUrl = searchParams.get("redirect_url") || "/chat";
    router.push(redirectUrl);
    return null;
  }

  const handleDemoLogin = async () => {
    if (!isSignInLoaded) return;

    try {
      const result = await signIn.create({
        identifier: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "",
        password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "",
      });

      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });

        const redirectUrl = searchParams.get("redirect_url") || "/chat";
        window.location.href = redirectUrl;
      }

      toast.success(t("auth.demoLoginDescription"));
    } catch (error) {
      console.error("Error logging in as demo user:", error);
      toast.error(t("auth.errorDemoLogin"));
    }
  };

  // Loading indicator while Clerk is initializing
  if (!isPageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t("auth.signInAccount")}
          </h2>
        </div>

        <div>
          <Button
            className="w-full mb-4 shadow-md shadow-accent/20 active:shadow-none transition-shadow duration-150"
            onClick={handleDemoLogin}
          >
            {t("auth.signInAsDemoUser")}
          </Button>

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
            fallbackRedirectUrl="/chat"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
