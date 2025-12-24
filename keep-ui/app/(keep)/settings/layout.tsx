import { PageSubtitle, PageTitle } from "@/shared/ui";
import { Card } from "@tremor/react";

export default function Layout({ children }: { children: any }) {
  return (
    <main className="flex flex-col h-full">
      <div className="mb-4">
        <PageTitle>Settings</PageTitle>
        <PageSubtitle>Manage access, permissions, and responsibilities</PageSubtitle>
      </div>
      {children}
    </main>
  );
}
