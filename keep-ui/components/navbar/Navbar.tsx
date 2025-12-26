import { auth } from "@/auth";
import { Search } from "@/components/navbar/Search";
import { SearchBar } from "@/components/navbar/SearchBar";
import { NoiseReductionLinks } from "@/components/navbar/NoiseReductionLinks";
import { AlertsLinks } from "@/components/navbar/AlertsLinks";
import { SettingsLinks } from "@/components/navbar/SettingsLinks";
import { GovernanceLinks } from "@/components/navbar/GovernanceLinks";
import { ControlPlaneLinks } from "@/components/navbar/ControlPlaneLinks";
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
          <ControlPlaneLinks session={session} />
          <IncidentsLinks session={session} />
          <AlertsLinks session={session} />
          <NoiseReductionLinks session={session} />
          <DashboardLinks />
          <GovernanceLinks session={session} />
          <SettingsLinks session={session} />
        </div>
        <UserInfo session={session} />
      </Menu>
      <MinimizeMenuButton />
      <SetSentryUser session={session} />
    </>
  );
}
