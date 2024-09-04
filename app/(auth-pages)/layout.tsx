export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12 justify-center align-middle p-12">{children}</div>
  );
}
