function Flag({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="block max-w-8 rounded-xs border border-gray-100"
    />
  );
}

export default Flag;
