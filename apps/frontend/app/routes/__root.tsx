import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import appCss from "@/styles/app.css?url";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
    {
        head: () => ({
            meta: [
                {
                    charSet: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    title: "Pinpoint",
                },
            ],
            links: [
                {
                    rel: "stylesheet",
                    href: appCss,
                },
            ],
        }),
        errorComponent: (props) => {
            return (
                <RootDocument>
                    <h1>oops</h1>
                    {props.error.message}
                </RootDocument>
            );
        },
        notFoundComponent: () => <h1>Not found</h1>,
        component: RootComponent,
    },
);

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <TanStackRouterDevtools position="bottom-right" />
                <ReactQueryDevtools buttonPosition="bottom-left" />
                <Scripts />
            </body>
        </html>
    );
}
