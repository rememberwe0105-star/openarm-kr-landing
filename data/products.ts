export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "Robots" | "Kits" | "Accessories";
  tag?: string;
  isCustomOrder?: boolean;
}

export const products: Product[] = [
  {
    id: "follower-v1.1",
    name: "OpenArm Follower Dual Arm V1.1",
    price: 5299,
    description: "Left Arm + Right Arm + Pedestal + Follower Grips\nThis product is made based on the specifications issued by OpenArm.",
    imageUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690805cb537ce0d0faf4b22e/b102af9b0_follower1_bg.png",
    category: "Robots"
  },
  {
    id: "leader-v1.1",
    name: "OpenArm Leader Dual Arm V1.1",
    price: 5399,
    description: "Left Arm + Right Arm + Pedestal + Leader Grips\nThis product is made based on the specifications issued by OpenArm.",
    imageUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690805cb537ce0d0faf4b22e/d050a5074_leader1_bg.png",
    category: "Robots"
  },
  {
    id: "follower-3cam",
    name: "Follower V1.1 with 3 Cameras",
    price: 6899,
    description: "Follower Dual Arm + Pedestal + Intel RealSense Cameras\nThis is the OpenArm Follower Dual Arm V1.1 equipped with three Intel RealSense cameras.",
    imageUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690805cb537ce0d0faf4b22e/b102af9b0_follower1_bg.png",
    category: "Robots"
  }
];
