import Image from "next/image";

export default function FeaturedProducts() {

  const products = [
    {
      name: "Stylish Kurta",
      price: "₹999",
      image: "/images/product1.png",
    },
    {
      name: "Casual Shirt",
      price: "₹799",
      image: "/images/product2.png",
    },
    {
      name: "Designer Saree",
      price: "₹1999",
      image: "/images/product3.png",
    },
    {
      name: "Kids Party Dress",
      price: "₹699",
      image: "/images/product4.jpg",
    },
  ];

  return (
    <section className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[4px] text-gray-500 mb-2">
            TRENDING
          </p>

          <h2 className="text-4xl font-semibold text-gray-900">
            Featured Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">

          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">

              {/* Product Image */}
              <div className="relative overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Hover Button */}
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2 text-sm opacity-0 group-hover:opacity-100 transition">
                  View Product
                </button>

              </div>

              {/* Product Info */}
              <div className="p-4 text-center">

                <h3 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  {product.price}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}