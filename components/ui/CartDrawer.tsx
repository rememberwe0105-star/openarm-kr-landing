"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background-main border-l border-border-light shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-2xl font-bold text-foreground-main tracking-tight">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 text-foreground-sub hover:text-point transition-colors rounded-full hover:bg-background-sub"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-foreground-sub">
              <p className="text-lg">Your cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-background-sub rounded-2xl border border-border-light relative group">
                {/* Thumbnail */}
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <div 
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 pb-1">
                  <h3 className="text-sm font-bold text-foreground-main mb-1 pr-6 leading-tight">
                    {item.name}
                  </h3>
                  <div className="text-point font-mono font-bold text-sm mb-auto">
                    {item.displayPrice ? item.displayPrice : `$${item.price.toLocaleString()}`}
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 border border-border-light rounded-full px-3 py-1 bg-background-main">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-foreground-sub hover:text-foreground-main transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm min-w-[20px] text-center font-medium text-foreground-main">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-foreground-sub hover:text-foreground-main transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-foreground-sub hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border-light bg-background-main">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-foreground-main">Total</span>
              <span className="text-2xl font-mono font-bold text-foreground-main">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-foreground-sub mb-6 text-center">
              Taxes, discounts and shipping calculated upon inquiry.
            </p>
            <button 
              onClick={onCheckout}
              className="w-full bg-point text-white py-4 rounded-xl font-bold text-lg hover:bg-point/80 shadow-lg shadow-point/20 transition-all duration-300"
            >
              Submit Inquiry
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-3 bg-transparent text-foreground-main py-4 rounded-xl font-medium text-sm hover:bg-background-sub transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
