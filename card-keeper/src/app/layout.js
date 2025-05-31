import "../styles/globals.css";

export const metadata = {
    title: "CardKeeper",
    description: "App to manage card collection",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#060a0e" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="CardKeeper" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
