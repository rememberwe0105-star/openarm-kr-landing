import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Product, ProductOption } from "@/data/products";
import Image from "next/image";

interface CameraOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, selectedOptions: ProductOption[]) => void;
}

export default function CameraOptionModal({ isOpen, onClose, product, onAddToCart }: CameraOptionModalProps) {
  const [selectedChest, setSelectedChest] = useState<string | null>(null);
  const [selectedArm, setSelectedArm] = useState<boolean>(false);
  const [viewedOptId, setViewedOptId] = useState<string | null>(null);

  // Reset state when modal opens with a new product
  useEffect(() => {
    if (isOpen && product) {
      const isBundle = product.id === 'follower-v1.1-3cam';
      const chestOptions = product.options?.filter(opt => opt.type === "chest") || [];
      
      setSelectedChest(isBundle && chestOptions.length > 0 ? chestOptions[0].id : null);
      setSelectedArm(isBundle);
      setViewedOptId(isBundle && chestOptions.length > 0 ? chestOptions[0].id : null);
    }
  }, [isOpen, product]);

  if (!isOpen || !product || !product.options) return null;

  const chestOptions = product.options.filter(opt => opt.type === "chest");
  const armOption = product.options.find(opt => opt.type === "arm");

  const currentViewedOpt = product.options.find(opt => opt.id === viewedOptId) || product.options[0];
  const displayImage = currentViewedOpt.imageUrl || product.imageUrl;

  const isBundle = product.id === 'follower-v1.1-3cam';

  const handleSelectChest = (id: string) => {
    const newSelected = isBundle ? id : (selectedChest === id ? null : id);
    setSelectedChest(newSelected);
    if (newSelected) setViewedOptId(newSelected);
  };

  const handleSelectArm = () => {
    if (isBundle) return; // Cannot unselect in bundle
    const newSelected = !selectedArm;
    setSelectedArm(newSelected);
    if (newSelected && armOption) setViewedOptId(armOption.id);
  };

  const handleAddToCart = () => {
    const selectedOptions: ProductOption[] = [];
    if (selectedChest) {
      const chestOpt = chestOptions.find(o => o.id === selectedChest);
      if (chestOpt) selectedOptions.push(chestOpt);
    }
    if (selectedArm && armOption) {
      selectedOptions.push(armOption);
    }
    onAddToCart(product, selectedOptions);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] bg-background-main border border-border-light shadow-2xl rounded-2xl flex flex-col transform transition-transform duration-300 md:p-8 p-4 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6 pb-4 border-b border-border-light shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-main">Select Options</h2>
          <button onClick={onClose} className="p-2 text-foreground-sub hover:text-point transition-colors bg-background-sub rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {/* Main Large Image */}
              <div className="w-full bg-white rounded-xl flex items-center justify-center p-8 border border-border-light aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={displayImage} 
                  alt={currentViewedOpt.name} 
                  width={800}
                  height={600}
                  className={`w-full h-full object-contain mix-blend-multiply transition-all duration-300 ${currentViewedOpt.id === 'd405' ? 'scale-[1.3]' : ''}`} 
                />
              </div>
              
              {/* Thumbnail Gallery (Like Intel Store) */}
              <div className="grid grid-cols-3 gap-3">
                {product.options.map(opt => {
                  const isActive = viewedOptId ? viewedOptId === opt.id : product.options![0].id === opt.id;
                  return (
                    <button 
                      key={`thumb-${opt.id}`}
                      onClick={() => setViewedOptId(opt.id)}
                      className={`bg-white rounded-xl py-3 px-2 border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        isActive 
                          ? "border-[#009cff]" 
                          : "border-border-light hover:border-border-dark opacity-100"
                      }`}
                    >
                      <div className="w-full h-10 flex items-center justify-center relative">
                        {opt.imageUrl && <Image src={opt.imageUrl} alt={opt.name} fill sizes="100px" className={`object-contain mix-blend-multiply opacity-90 ${opt.id === 'd405' ? 'scale-[1.3]' : ''}`} />}
                      </div>
                      <span className={`text-[13px] font-bold whitespace-nowrap w-full text-center ${isActive ? 'text-[#009cff]' : 'text-foreground-sub'}`}>
                        {opt.specs.modelName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-foreground-main mb-2 whitespace-pre-line">{product.name}</h3>
              <p className="text-foreground-sub text-sm mb-4 whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Options Selection */}
          <div className="bg-background-sub border border-border-light rounded-xl p-6 mb-8">
            {isBundle && (
              <>
                <h4 className="text-lg font-bold text-foreground-main mb-4 border-b border-border-light pb-2">Base Robot (Included)</h4>
                <div className="mb-6">
                  <div className="relative p-4 rounded-xl border-2 cursor-default border-point bg-point/10 flex items-center gap-3">
                    <div className="w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center border-point bg-point text-white">
                      <Check size={14} />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-foreground-main block mb-1 text-sm leading-tight">OpenArm Follower Dual Arm V1.1</span>
                      <span className="text-xs text-foreground-sub block font-mono">Platform Standard</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <h4 className="text-lg font-bold text-foreground-main mb-4 border-b border-border-light pb-2">
              {isBundle ? "Chest Camera (Select one required)" : "Chest Camera (Select one or none)"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {chestOptions.map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => handleSelectChest(opt.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 ${selectedChest === opt.id ? "border-point bg-point/5" : "border-border-light hover:border-foreground-main/30"}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${selectedChest === opt.id ? "border-point bg-point text-white" : "border-foreground-sub"}`}>
                    {selectedChest === opt.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-foreground-main block mb-1 text-sm leading-tight">{opt.name}</span>
                    <span className="text-xs text-foreground-sub block font-mono">PN: {opt.specs.pn}</span>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-bold text-foreground-main mb-4 border-b border-border-light pb-2">
              {isBundle ? "Arm Cameras (Included)" : "Arm Cameras (Optional)"}
            </h4>
            {armOption && (
              <div 
                onClick={handleSelectArm}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 max-w-md ${isBundle ? "cursor-default border-point bg-point/10" : "cursor-pointer"} ${!isBundle && selectedArm ? "border-point bg-point/5" : ""} ${!isBundle && !selectedArm ? "border-border-light hover:border-foreground-main/30" : ""}`}
              >
                <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${selectedArm ? "border-point bg-point text-white" : "border-foreground-sub"}`}>
                  {selectedArm && <Check size={14} />}
                </div>
                <div className="flex-1">
                  <span className="font-bold text-foreground-main block mb-1 text-sm leading-tight">{armOption.name}</span>
                  <span className="text-xs text-foreground-sub block font-mono">PN: {armOption.specs.pn}</span>
                </div>
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="mb-4">
            <h4 className="text-xl font-bold text-foreground-main mb-4">Specifications</h4>
            <div className="overflow-x-auto rounded-xl border border-border-light">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-foreground-sub uppercase bg-background-sub border-b border-border-light">
                  <tr>
                    <th className="px-4 py-3">Specification</th>
                    {chestOptions.map(opt => <th key={opt.id} className="px-4 py-3 min-w-[200px]">{opt.specs.modelName} (Chest)</th>)}
                    {armOption && <th className="px-4 py-3 min-w-[200px]">{armOption.specs.modelName} (Arm)</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-foreground-main font-medium">
                  {[
                    { label: "Depth Tech", key: "depthTech" },
                    { label: "Range (Depth)", key: "range" },
                    { label: "Depth Res", key: "depthRes" },
                    { label: "Depth Acc", key: "depthAcc" },
                    { label: "RGB Res", key: "rgbRes" },
                    { label: "Sensor", key: "sensor" },
                    { label: "Shutter", key: "shutter" },
                    { label: "FOV", key: "fov" },
                    { label: "Filter", key: "filter" },
                    { label: "Size", key: "size" },
                    { label: "Interface", key: "interface" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-background-sub/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground-sub bg-background-sub/30">{row.label}</td>
                      {chestOptions.map(opt => <td key={opt.id} className="px-4 py-3">{(opt.specs as unknown as Record<string, string>)[row.key] || "-"}</td>)}
                      {armOption && <td className="px-4 py-3">{(armOption.specs as unknown as Record<string, string>)[row.key] || "-"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-6 mt-4 border-t border-border-light flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border border-border-light font-bold text-foreground-main hover:bg-background-sub transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleAddToCart}
            disabled={!selectedChest && !selectedArm}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${(!selectedChest && !selectedArm) ? "bg-border-light text-foreground-sub cursor-not-allowed" : "bg-point text-white hover:bg-point/80 hover:shadow-point/20"}`}
          >
            Add Selected to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
