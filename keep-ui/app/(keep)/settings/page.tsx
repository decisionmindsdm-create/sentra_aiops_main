import { Suspense } from "react";
import SettingsPage from "./settings.client";

export default function Page() {
  return (
    <Suspense>
      <SettingsPage />
    </Suspense>
  );
}

export const metadata = {
  title: "Sentra - Settings",
  description: "Configure your Keep.",
};
