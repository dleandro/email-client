import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

import "./tailwind.css";
import Sidebar from "./components/sidebar";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  const [panelSizes, setPanelSizes] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("panelSizes");
      return saved ? JSON.parse(saved) : [20, 80];
    }
    return [20, 80];
  });

  const handleLayout = (sizes: number[]) => {
    setPanelSizes(sizes);
    if (typeof window !== "undefined") {
      localStorage.setItem("panelSizes", JSON.stringify(sizes));
    }
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={handleLayout}
          className="min-h-screen"
        >
          <ResizablePanel
            defaultSize={panelSizes[0]} 
            minSize={15} 
            maxSize={20}
            className="transition-none" 
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={panelSizes[1]} 
            minSize={50} 
            className="transition-none" 
          >
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
