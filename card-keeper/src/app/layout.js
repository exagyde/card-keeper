import "../styles/globals.css";

export const metadata = {
    title: "CardKeeper",
    description: "App to manage card collection",
    icons: {
        icon: "/icon-192x192.png",
        apple: "/icon-192x192.png",
    },
    manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#060a0e" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
