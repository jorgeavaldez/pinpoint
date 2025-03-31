import { createFileRoute } from "@tanstack/react-router";
import SignIn from "@/components/signin";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	return (
		<main>
			<SignIn />
		</main>
	);
}
