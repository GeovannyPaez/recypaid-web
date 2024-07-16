import { ThemeProvider } from "@/components/theme/theme-provider";

type Props = Readonly<{
  children: React.ReactNode;
}>;
export default function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
}
