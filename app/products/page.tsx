"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { products } from "@/data/products";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CartDrawer, { CartItem } from "@/components/ui/CartDrawer";
import CheckoutModal from "@/components/ui/CheckoutModal";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.fromTo(
      ".featured-product",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-background-main">
      <ScrollProgress />
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex items-end justify-between border-b border-border-light">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground-main mb-4">
            {t("products_page.title_1")} <span className="text-point">{t("products_page.title_2")}</span>
          </h1>
          <p className="text-foreground-sub text-lg lg:text-xl max-w-2xl font-medium">
            {t("products_page.subtitle")}
          </p>
        </div>
        
        {/* Floating/Header Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="hidden md:flex items-center gap-2 bg-background-sub border border-border-light text-foreground-main px-6 py-3 rounded-full hover:border-point transition-colors group relative"
        >
          <ShoppingBag size={20} className="group-hover:text-point transition-colors" />
          <span className="font-bold">{t("products_page.cart")}</span>
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-point text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
              {cartItemsCount}
            </span>
          )}
        </button>
      </section>

      {/* Mobile Cart Button (Fixed Bottom) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-foreground-main text-background-main p-4 rounded-full shadow-2xl flex items-center justify-center"
      >
        <ShoppingBag size={24} />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-point text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-foreground-main">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Featured Products Layout */}
      <section className="py-16 pb-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div ref={containerRef} className="flex flex-col gap-24">
          {products.map((product) => (
            <div 
              key={product.id}
              className="featured-product flex flex-col lg:flex-row items-center gap-10 lg:gap-16 group"
            >
              {/* Product Large Image Container */}
              <div className="w-full lg:w-3/5 bg-[#eff1f4] dark:bg-background-sub rounded-[2rem] p-8 lg:p-12 relative overflow-hidden flex items-center justify-center origin-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-point/5">
                {product.tag && (
                  <span className="absolute top-6 left-6 bg-point text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-md">
                    {product.tag}
                  </span>
                )}
                {product.category && (
                  <span className="absolute top-6 right-6 text-foreground-sub/60 font-mono text-sm tracking-widest uppercase z-10 font-bold">
                    {product.category}
                  </span>
                )}

                <div className="relative w-full aspect-[4/3] max-w-2xl flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.imageUrl}')` }}
                  />
                </div>
              </div>

              {/* Product Info (Anvil Style) */}
              <div className="w-full lg:w-2/5 flex flex-col items-start py-4">
                <h2 className="text-3xl lg:text-4xl font-black text-foreground-main leading-tight mb-4 tracking-tight">
                  {product.name}
                </h2>
                
                <div className="text-2xl font-mono text-point font-bold mb-8 opacity-90">
                  {product.displayPrice ? product.displayPrice : `$${product.price.toLocaleString()}`}
                </div>
                
                <div className="text-foreground-sub text-base lg:text-lg mb-10 whitespace-pre-line leading-relaxed font-medium">
                  {product.description}
                </div>
                
                {product.isCustomOrder ? (
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-foreground-main text-background-main py-4 rounded-xl font-bold text-lg hover:bg-foreground-main/80 transition-all duration-300 shadow-xl"
                  >
                    {t("products_page.custom_order")}
                  </button>
                ) : (
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-transparent border-2 border-foreground-main text-foreground-main py-4 rounded-xl font-bold text-lg hover:bg-foreground-main hover:text-background-main transition-all duration-300"
                  >
                    {t("products_page.add_to_cart")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer Output */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <Footer />
    </main>
  );
}
