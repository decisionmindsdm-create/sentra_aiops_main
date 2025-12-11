// UI Change Only - functionality unchanged
import { ReactNode } from "react";
import { NextAuthProvider } from "../auth-provider";
import { Mulish } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "components/navbar/Navbar";
import HeaderWrapper from "components/header/HeaderWrapper";
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

// If loading a variable font, you don't need to specify the font weight
const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const config = getConfig();
  const session = await auth();

  return (
    <html lang="en" className={`bg-white ${mulish.className}`}>
      <body className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30">
        {/* ThemeScript must be the first thing to avoid flickering */}
        <ThemeScript />
        <ConfigProvider config={config}>
          <PHProvider>
            <NextAuthProvider session={session}>
              <TopologyPollingContextProvider>
                <WorkflowModalProvider>
                  {/* @ts-ignore-error Server Component */}
                  <PostHogPageView />
                  
                  {/* Header at the top - visible on all pages */}
                  <HeaderWrapper session={session} />
                  
                  {/* Main container with sidebar and content */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <Navbar />
                    
                  {/* Main content area */}
                  <main className="flex-1 flex flex-col overflow-auto bg-white/40 backdrop-blur-sm">
                    {/* Add the banner here, before the content */}
                    {config.READ_ONLY && <ReadOnlyBanner />}
                    <div className="flex-1 p-1">{children}</div>
                      {/** footer */}
                      {process.env.GIT_COMMIT_HASH &&
                        process.env.SHOW_BUILD_INFO !== "false" && (
                          <div className="pointer-events-none w-full px-4 py-2 text-slate-400 text-xs bg-gradient-to-t from-slate-50/80 to-transparent">
                            <div className="w-full text-right font-medium">
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
