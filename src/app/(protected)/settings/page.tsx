import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
	return (
		<h1 className="mx-auto pt-8">
			Hi, {user.username}!
		</h1>
	);
}