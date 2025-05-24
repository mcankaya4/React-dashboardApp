function CabinListHeader() {
  return (
    <header
      className="grid grid-cols-[1fr_2fr_1fr] items-center gap-6 border border-gray-100 bg-gray-50 px-3 py-4 font-semibold tracking-[0.4px] text-gray-600 uppercase lg:grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] lg:px-6"
      role="row"
    >
      <div>Img</div>
      <div>Cabin</div>
      <div className="hidden lg:block">Capacity</div>
      <div className="hidden lg:block">Price</div>
      <div className="hidden lg:block">Discount</div>
      <div>Process</div>
    </header>
  );
}

export default CabinListHeader;
