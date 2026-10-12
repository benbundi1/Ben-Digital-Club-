import './globals.css';

export const metadata = {
  title: 'BenDigitalClub',
  description: 'AI systems for building and scaling digital growth.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
