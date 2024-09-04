import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: Message;
}) {
    return (
        <div className="flex flex-col gap-12 justify-center align-middle p-12">
            <form className="flex flex-col max-w-md p-4 gap-2 [&>input]:mb-4 mx-auto">
                <h1 className="text-2xl font-medium">Reset password</h1>
                <p className="text-sm text-foreground/60">
                    Please enter your new password below.
                </p>
                <Label htmlFor="password">New password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="New password"
                    required
                />
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                />
                <SubmitButton formAction={resetPasswordAction}>
                    Reset password
                </SubmitButton>
                <FormMessage message={searchParams} />
            </form>
        </div>
    );
}
