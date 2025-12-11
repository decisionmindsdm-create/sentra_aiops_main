import { Client } from "./client";

export default function Page() {
  // Inherits the same sidebar/top layout from /(keep) layout automatically
  return <Client />;
}

export const metadata = {
  title: "Dm AIops - Analysis",
  description: "analysis dashboard",
};
