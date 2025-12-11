// UI Change Only - functionality unchanged
import { Session } from "next-auth";
import { Header } from "./Header";

interface HeaderWrapperProps {
  session: Session | null;
}

export default function HeaderWrapper({ session }: HeaderWrapperProps) {
  return (
    <div className="relative">
      <Header session={session} />
    </div>
  );
}
