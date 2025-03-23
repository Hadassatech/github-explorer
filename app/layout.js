import './globals.css';

export const metadata = {
  title: 'GitHub Explorer',
  description: 'Explore GitHub repositories',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
