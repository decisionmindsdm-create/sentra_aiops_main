import { ReactNode } from "react";
import { NextAuthProvider } from "../auth-provider";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "components/navbar/Navbar";
import { TopologyPollingContextProvider } from "@/app/(keep)/topology/model/TopologyPollingContext";
import { getConfig } from "@/shared/lib/server/getConfig";
import { ConfigProvider } from "../config-provider";
import { PHProvider } from "../posthog-provider";
import ReadOnlyBanner from "@/components/banners/read-only-banner";
import { auth } from "@/auth";
import { ThemeScript, WatchUpdateTheme } from "@/shared/ui";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { PostHogPageView } from "@/shared/ui/PostHogPageView";
import { WorkflowModalProvider } from "@/features/workflows/manual-run-workflow";

// UI Change Only - functionality unchanged
// Use Inter font for modern enterprise look
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const config = getConfig();
  const session = await auth();

  return (
    <html lang="en" className={`${inter.className}`} style={{ backgroundColor: '#FFFFFF' }}>
      <body className="h-screen flex flex-col overflow-hidden">
        {/* ThemeScript must be the first thing to avoid flickering */}
        <ThemeScript />
        <ConfigProvider config={config}>
          <PHProvider>
            <NextAuthProvider session={session}>
              <TopologyPollingContextProvider>
                <WorkflowModalProvider>
                  {/* @ts-ignore-error Server Component */}
                  <PostHogPageView />
                  
                  {/* Fixed Top Header */}
                  <Navbar />
                  
                  {/* Main layout wrapper - flex row with sidebar and content */}
                  {/* UI Change Only - functionality unchanged */}
                  <div className="flex flex-1 overflow-hidden" style={{ marginTop: '56px' }}>
                    {/* Spacer for fixed sidebar on desktop - matches sidebar widths at each breakpoint */}
                    <div className="hidden lg:block xl:hidden flex-shrink-0" style={{ width: '240px' }} />
                    <div className="hidden xl:block 2xl:hidden flex-shrink-0" style={{ width: '260px' }} />
                    <div className="hidden 2xl:block flex-shrink-0" style={{ width: '280px' }} />
                    
                    {/* Main Content Area - automatically sizes to remaining space */}
                    <main className="page-container flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{ paddingTop: '20px' }}>
                      {/* Add the banner here, before the navbar */}
                      {config.READ_ONLY && <ReadOnlyBanner />}
                      <div className="flex-1">{children}</div>
                      {/** footer */}
                      {process.env.GIT_COMMIT_HASH &&
                        process.env.SHOW_BUILD_INFO !== "false" && (
                          <div className="pointer-events-none opacity-80 w-full p-2 text-slate-400 text-xs">
                            <div className="w-full text-right">
                              Version: {process.env.KEEP_VERSION} | Build:{" "}
                              {process.env.GIT_COMMIT_HASH.slice(0, 6)}
                            </div>
                          </div>
                        )}
                      <ToastContainer />
                    </main>
                  </div>
                </WorkflowModalProvider>
              </TopologyPollingContextProvider>
            </NextAuthProvider>
          </PHProvider>
        </ConfigProvider>
        <WatchUpdateTheme />
      </body>
    </html>
  );
}
