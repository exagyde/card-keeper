import "../styles/globals.css";

export const metadata = {
    title: "CardKeeper",
    description: "App to manage card collection",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-title" content="CardKeeper" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
