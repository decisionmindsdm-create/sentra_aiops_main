// UI Change Only - functionality unchanged
import { auth } from "@/auth";
import { NoiseReductionLinks } from "@/components/navbar/NoiseReductionLinks";
import { AlertsLinks } from "@/components/navbar/AlertsLinks";
import { UserInfo } from "@/components/navbar/UserInfo";
import { Menu } from "@/components/navbar/Menu";
import { DashboardLinks } from "@/components/navbar/DashboardLinks";
import { IncidentsLinks } from "@/components/navbar/IncidentLinks";
import { SetSentryUser } from "./SetSentryUser";
import "./Navbar.css";

export default async function NavbarInner() {
  const session = await auth();

  return (
    <>
      <Menu session={session}>
        <div className="pt-5 px-3 space-y-1.5 flex-1 overflow-auto scrollable-menu-shadow">
          <DashboardLinks />
          <IncidentsLinks session={session} />
          <AlertsLinks session={session} />
          <NoiseReductionLinks session={session} />
          
        </div>
        <UserInfo session={session} />
      </Menu>
      <SetSentryUser session={session} />
    </>
  );
}
