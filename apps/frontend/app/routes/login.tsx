import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	return <main>Login</main>;
}
