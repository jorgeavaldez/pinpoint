import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pinpoint" },
    { name: "description", content: "store it now!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
