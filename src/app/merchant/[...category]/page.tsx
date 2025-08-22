type Product = {
  name: string;
  description: string;
  image: string;
};

const productData: Record<string, Product> = {
  phone: {
    name: "Smartphone X200",
    description:
      "A sleek smartphone with an excellent camera and long-lasting battery.",
    image: "https://via.placeholder.com/300x200?text=Phone",
  },
  laptop: {
    name: "UltraBook Pro 15",
    description: "Lightweight performance laptop with a stunning display.",
    image: "https://via.placeholder.com/300x200?text=Laptop",
  },
  nike: {
    name: "Nike Air Shoes",
    description:
      "Comfortable sports shoes with modern design and durable material.",
    image: "https://via.placeholder.com/300x200?text=Nike+Shoes",
  },
};

export default function ProductPage({
  params,
}: {
  params: { category: string[] }; // 👈 match folder name
}) {
  const segments = params.category;
  const category = segments[0];
  const productSlug = segments[segments.length - 1]; // last segment = product
  const product = productData[productSlug as keyof typeof productData];

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dynamic Product Route</h1>
      <p>
        Full path: <strong>{segments.join(" / ")}</strong>
      </p>
      <p>
        Category: <strong>{category}</strong>
      </p>

      {product ? (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #ddd",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
          />
          <p>{product.description}</p>
        </div>
      ) : (
        <p style={{ color: "red" }}>❌ Product not found</p>
      )}
    </div>
  );
}
