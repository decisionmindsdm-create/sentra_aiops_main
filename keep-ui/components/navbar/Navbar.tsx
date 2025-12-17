import { auth } from "@/auth";
import { Search } from "@/components/navbar/Search";
import { SearchBar } from "@/components/navbar/SearchBar";
import { NoiseReductionLinks } from "@/components/navbar/NoiseReductionLinks";
import { ObservabilityLinks } from "@/components/navbar/ObservabilityLinks";
import { AlertsLinks } from "@/components/navbar/AlertsLinks";
import { UserInfo } from "@/components/navbar/UserInfo";
import { Menu } from "@/components/navbar/Menu";
import { MinimizeMenuButton } from "@/components/navbar/MinimizeMenuButton";
import { DashboardLinks } from "@/components/navbar/DashboardLinks";
import { IncidentsLinks } from "@/components/navbar/IncidentLinks";
import { Header } from "@/components/navbar/Header";
import { SetSentryUser } from "./SetSentryUser";
import "./Navbar.css";

export default async function NavbarInner() {
  const session = await auth();

  return (
    <>
      {/* Fixed Top Header */}
      <Header session={session} searchComponent={<SearchBar />} />
      
      {/* Left Sidebar */}
      <Menu session={session}>
        <div className="pt-2 pb-2 space-y-3 flex-1 overflow-y-auto px-2">
          <DashboardLinks />
          <IncidentsLinks session={session} />
          <AlertsLinks session={session} />
          <ObservabilityLinks session={session} />
          <NoiseReductionLinks session={session} />
        </div>
        <UserInfo session={session} />
      </Menu>
      <MinimizeMenuButton />
      <SetSentryUser session={session} />
    </>
  );
}
