import { fetchUserFavorites } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  const favoritesProducts = favorites.map((favorite) => favorite.product);

  if (favorites.length === 0) {
    return <SectionTitle text="You have no favorites yet." />;
  }

  return (
    <div className="pt-8">
      <SectionTitle text="favorites" />
      <ProductsGrid products={favoritesProducts} />
    </div>
  );
}

export default FavoritesPage;
