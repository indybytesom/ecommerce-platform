type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-full md:max-w-7xl 2xl:max-w-[90%] px-5 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}