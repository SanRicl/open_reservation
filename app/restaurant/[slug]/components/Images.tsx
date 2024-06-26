const Images = ({ images }: { images: string[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center md:text-start mt-10 mb-7 border-b pb-5">
        {images.length} photo{images.length > 1 ? 's' : ''}
      </h1>
      <div className="flex flex-wrap justify-center md:justify-normal">
        {images.map((image, index) => (
          <img
            key={index}
            className="w-56 h-44 mr-1 mb-1"
            src={`${image}`}
            alt="restaurant image"
          />
        ))}
      </div>
    </div>
  )
}

export default Images
