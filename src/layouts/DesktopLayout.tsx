interface DesktopLayoutProps {
  children: React.ReactNode;
}

function DesktopLayout({ children }: DesktopLayoutProps) {
  return <div>{children}</div>;
}
export default DesktopLayout;
