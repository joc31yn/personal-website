// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SectionWrapper = (Component: any) =>
  function HOC() {
    return (
      <div className="px-8 sm:px-16 md:px-10 xl:px-36">
        <Component />
      </div>
    );
  };

export default SectionWrapper;
