export interface ProductOptionSpec {
  modelName: string;
  pn: string;
  depthTech: string;
  range: string;
  depthRes: string;
  depthAcc?: string;
  rgbRes: string;
  sensor: string;
  shutter: string;
  fov: string;
  filter: string;
  size: string;
  interface: string;
}

export interface ProductOption {
  id: string;
  name: string;
  type: "chest" | "arm";
  imageUrl?: string;
  specs: ProductOptionSpec;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "Robots" | "Kits" | "Accessories";
  tag?: string;
  isCustomOrder?: boolean;
  displayPrice?: string;
  options?: ProductOption[];
}

export const products: Product[] = [
  {
    id: "follower-v1.1",
    name: "OpenArm Follower Dual Arm V1.1",
    price: 0,
    displayPrice: "Contact us",
    description: "Left Arm + Right Arm + Pedestal + Follower Grips\nThis product is made based on the specifications issued by OpenArm.",
    imageUrl: "/images/products/follower_clean.png",
    category: "Robots"
  },
  {
    id: "leader-v1.1",
    name: "OpenArm Leader Dual Arm V1.1",
    price: 0,
    displayPrice: "Contact us",
    description: "Left Arm + Right Arm + Pedestal + Leader Grips\nThis product is made based on the specifications issued by OpenArm.",
    imageUrl: "/images/products/leader_clean.png",
    category: "Robots"
  },
  {
    id: "follower-v1.1-3cam",
    name: "Follower V1.1 with 3 Cameras",
    price: 0,
    displayPrice: "Contact us",
    description: "Follower Dual Arm + Pedestal + Intel RealSense Cameras\nThis is the OpenArm Follower Dual Arm V1.1 equipped with three Intel RealSense cameras.",
    imageUrl: "/images/products/follower_3cam_bundle_2.svg",
    category: "Robots",
    options: [
      {
        id: "d435if",
        name: "Option 1: D435IF (Chest Camera / 가슴에 고정)",
        type: "chest",
        imageUrl: "/images/products/d435if_camera.png",
        specs: {
          modelName: "D435IF",
          pn: "82635D435IF",
          depthTech: "Active IR Stereo",
          range: "0.3m ~ 3m",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 2% error at 2m",
          rgbRes: "1920 x 1080 (30fps)",
          sensor: "OV9282 (Depth) / OV2740(RGB)",
          shutter: "Global (Depth) / Rolling (RGB)",
          fov: "87° x 58° (Depth) / 69° x 42° (RGB)",
          filter: "Integrated IR Pass Filter (750nm)",
          size: "90 x 25.8 x 25 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      },
      {
        id: "d455f",
        name: "Option 2: D455F (Chest Camera / 가슴에 고정)",
        type: "chest",
        imageUrl: "/images/products/d455f_camera.png",
        specs: {
          modelName: "D455F",
          pn: "82635D455F",
          depthTech: "Active IR Stereo",
          range: "0.6m ~ 6m",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 2% error at 4m",
          rgbRes: "1280 x 800 (30fps)",
          sensor: "OV9282 (Depth) / OV9782 (RGB)",
          shutter: "Global (Depth) / Global (RGB)",
          fov: "87° x 58° (Depth) / 90° x 65° (RGB)",
          filter: "Integrated IR Pass Filter (750nm)",
          size: "124 x 29 x 26.8 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      },
      {
        id: "d405",
        name: "Option 3: D405 (Arm Cameras / 양 팔에 고정)",
        type: "arm",
        imageUrl: "/images/products/d405_camera.png",
        specs: {
          modelName: "D405",
          pn: "82635D405",
          depthTech: "Image-based Stereo",
          range: "7cm ~ 50cm",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 1.4% error at 20cm",
          rgbRes: "1280 x 720 (30fps)",
          sensor: "OV9282 (Depth) / OV9782 (RGB)",
          shutter: "Global (Depth) / Global (RGB)",
          fov: "84° x 58° (Depth) / 84° x 58° (RGB)",
          filter: "IR Cut Filter",
          size: "42 x 42 x 23 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      }
    ]
  },
  {
    id: "camera-package",
    name: "Additional Camera Package\nfor OpenArm Follower",
    price: 0,
    displayPrice: "Contact us",
    description: "You can purchase a separate camera that can be mounted on your follower robot.\nThere are a total of three cameras, one on the chest and one on both arms.\n* The camera mounted on the chest has specifications based on the purpose of the study, so you can choose the right model.",
    imageUrl: "/images/products/d435if_camera.png",
    category: "Accessories",
    isCustomOrder: true,
    options: [
      {
        id: "d435if",
        name: "Option 1: D435IF (Chest Camera / 가슴에 고정)",
        type: "chest",
        imageUrl: "/images/products/d435if_camera.png",
        specs: {
          modelName: "D435IF",
          pn: "82635D435IF",
          depthTech: "Active IR Stereo",
          range: "0.3m ~ 3m",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 2% error at 2m",
          rgbRes: "1920 x 1080 (30fps)",
          sensor: "OV9282 (Depth) / OV2740(RGB)",
          shutter: "Global (Depth) / Rolling (RGB)",
          fov: "87° x 58° (Depth) / 69° x 42° (RGB)",
          filter: "Integrated IR Pass Filter (750nm)",
          size: "90 x 25.8 x 25 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      },
      {
        id: "d455f",
        name: "Option 2: D455F (Chest Camera / 가슴에 고정)",
        type: "chest",
        imageUrl: "/images/products/d455f_camera.png",
        specs: {
          modelName: "D455F",
          pn: "82635D455F",
          depthTech: "Active IR Stereo",
          range: "0.6m ~ 6m",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 2% error at 4m",
          rgbRes: "1280 x 800 (30fps)",
          sensor: "OV9282 (Depth) / OV9782 (RGB)",
          shutter: "Global (Depth) / Global (RGB)",
          fov: "87° x 58° (Depth) / 90° x 65° (RGB)",
          filter: "Integrated IR Pass Filter (750nm)",
          size: "124 x 29 x 26.8 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      },
      {
        id: "d405",
        name: "Option 3: D405 (Arm Cameras / 양 팔에 고정)",
        type: "arm",
        imageUrl: "/images/products/d405_camera.png",
        specs: {
          modelName: "D405",
          pn: "82635D405",
          depthTech: "Image-based Stereo",
          range: "7cm ~ 50cm",
          depthRes: "Up to 1280 x 720 (30fps)",
          depthAcc: "< 1.4% error at 20cm",
          rgbRes: "1280 x 720 (30fps)",
          sensor: "OV9282 (Depth) / OV9782 (RGB)",
          shutter: "Global (Depth) / Global (RGB)",
          fov: "84° x 58° (Depth) / 84° x 58° (RGB)",
          filter: "IR Cut Filter",
          size: "42 x 42 x 23 mm³",
          interface: "USB-C 3.1 Gen 1"
        }
      }
    ]
  }
];
