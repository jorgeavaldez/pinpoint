import { createFileRoute } from "@tanstack/react-router";
import SignUp from "@/components/signup";

export const Route = createFileRoute("/signup")({
	component: Signup,
});

function Signup() {
	return <main><SignUp /></main>;
}
