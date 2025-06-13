import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {GitHub, GitHubBlack} from "@/assets/svg/GitHub";
import Google from "@/assets/svg/Google";
import { auth, signIn } from "@/utils/auth";
import SubmitButton from "../general/SubmitButton";
import { redirect } from "next/navigation";

const LoginForm = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="text-center shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Login with github */}
            <form
              action={async () => {
                "use server";
                await signIn("github", {
                  redirectTo: "/onboarding",
                });
              }}
            >
              <SubmitButton
                text="Login with Github"
                className="w-full"
                variant="outline"
                icon={<><GitHub className="size-4 hidden dark:block" /> <GitHubBlack className="size-4 dark:hidden" /></>}
              />
            </form>

            {/* Login with google */}
            <form action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/onboarding",
                });
              }}
              >
              <SubmitButton
                text="Login with Google"
                className="w-full"
                variant="outline"
                icon={<Google className="size-4" />}
              />
            </form>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground text-balance text-center">
        By clicking Continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
};

export default LoginForm;
