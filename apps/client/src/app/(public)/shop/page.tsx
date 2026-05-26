import Container from "@/components/ui/Container";
import ShopHeader from "@/components/product/shop/ShopHeader";
import ProductFilters from "@/components/product/shop/ProductFilters";
import SortDropdown from "@/components/product/shop/SortDropdown";
import ProductGrid from "@/components/product/shop/ProductGrid";
import MobileShopActions from "@/components/product/shop/MobileShopActions";
import { getProducts } from "@/features/products/productQueries";
import { filterProducts } from "@/features/products/productUtils";
import ActiveFilters from "@/components/product/shop/ActiveFilters";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    size?: string;
    availability?: string;
    price?: string;
  }>;
}) {
  const params = await searchParams;
  const products = getProducts();

  const filteredProducts = filterProducts({
    products,
    category: params.category,
    sort: params.sort,
    size: params.size,
    availability: params.availability,
    price: params.price,
  });

  return (
    <main className="py-16 lg:py-24">
      <Container>
        <ShopHeader />

        <div className="mt-12 grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ProductFilters />
            </div>
          </aside>

          {/* PRODUCTS */}
          <section>
            {/* MOBILE SHOP ACTIONS */}
            <MobileShopActions />

            {/* DESKTOP TOP BAR */}
            <div className="hidden items-center justify-between lg:flex">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 && "s"}
              </p>

              <SortDropdown />
            </div>
            {/* Active filters */}
            <ActiveFilters />

            <div className="mt-10">
              <ProductGrid
                category={params.category}
                sort={params.sort}
                size={params.size}
                availability={params.availability}
                price={params.price}
              />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
