import CustomThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "News Aggregator - Stay Updated with Latest News",
  description: "Get the latest news from multiple sources in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
