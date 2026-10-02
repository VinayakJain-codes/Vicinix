export interface MenuItem {
  id: string;
  name: string;
  category: "starters" | "mains" | "breads" | "desserts" | "beverages";
  description: string;
  price: number;
  isVeg: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  isAvailable: boolean; // 86 stockout toggle
  prepTimeMinutes: number;
  imageUrl?: string;
}

export type OrderStatus = "placed" | "preparing" | "served" | "completed";

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  isVeg: boolean;
}

export interface TableOrder {
  id: string;
  orderNumber: string; // e.g. "ORD-108"
  tableNumber: number;
  customerName?: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string; // ISO string
  totalAmount: number;
  paymentStatus: "pending" | "paid_online" | "cash";
}

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "m-1",
    name: "Truffle & Smoked Cottage Cheese Skewers",
    category: "starters",
    description: "Marinated malai paneer infused with black truffle oil, chargrilled with bell peppers and roasted sesame glaze.",
    price: 490,
    isVeg: true,
    isChefSpecial: true,
    isAvailable: true,
    prepTimeMinutes: 12,
  },
  {
    id: "m-2",
    name: "Bhatti Spiced Murgh Tikka",
    category: "starters",
    description: "Slow-roasted tender chicken thighs tossed in stone-ground degi mirch, hung curd, and roasted cumin.",
    price: 540,
    isVeg: false,
    isSpicy: true,
    isAvailable: true,
    prepTimeMinutes: 15,
  },
  {
    id: "m-3",
    name: "Crispy Lotus Stem in Wild Honey Chilli",
    category: "starters",
    description: "Thinly sliced lotus root tossed with Kashmiri red chili flakes, toasted scallions, and organic wild honey.",
    price: 440,
    isVeg: true,
    isSpicy: true,
    isAvailable: true,
    prepTimeMinutes: 10,
  },

  // Mains
  {
    id: "m-4",
    name: "24-Hour Slow-Cooked Dal Vicinix",
    category: "mains",
    description: "Signature black lentils simmered overnight on charcoal with churned white butter and vine-ripened tomatoes.",
    price: 520,
    isVeg: true,
    isChefSpecial: true,
    isAvailable: true,
    prepTimeMinutes: 8,
  },
  {
    id: "m-5",
    name: "Awadhi Dum Ghost Biryani",
    category: "mains",
    description: "Aged long-grain basmati layered with tender baby lamb, saffron ittar, and caramelized onions, sealed in clay pot.",
    price: 740,
    isVeg: false,
    isChefSpecial: true,
    isAvailable: true,
    prepTimeMinutes: 18,
  },
  {
    id: "m-6",
    name: "Smoked Butter Chicken Supreme",
    category: "mains",
    description: "Charcoal tandoor chicken pulled into a velvety sun-dried tomato and cashew velvet gravy with fenugreek butter.",
    price: 640,
    isVeg: false,
    isAvailable: true,
    prepTimeMinutes: 14,
  },

  // Breads
  {
    id: "m-7",
    name: "Garlic & Rosemary Infused Butter Naan",
    category: "breads",
    description: "Clay-oven baked leavened bread brushed with farm butter, crushed roasted garlic, and garden rosemary.",
    price: 140,
    isVeg: true,
    isAvailable: true,
    prepTimeMinutes: 6,
  },
  {
    id: "m-8",
    name: "Laccha Paratha — Multigrain Layered",
    category: "breads",
    description: "Flaky, crisp spiral flatbread layered with spiced ghee and carom seeds.",
    price: 130,
    isVeg: true,
    isAvailable: true,
    prepTimeMinutes: 6,
  },

  // Desserts
  {
    id: "m-9",
    name: "Saffron & Pistachio Kulfi Sphere",
    category: "desserts",
    description: "Artisanal condensed milk kulfi with edible 24K gold foil, crushed Iranian pistachios, and rose falooda.",
    price: 360,
    isVeg: true,
    isChefSpecial: true,
    isAvailable: true,
    prepTimeMinutes: 5,
  },

  // Beverages
  {
    id: "m-10",
    name: "Smoked Jamun & Black Salt Tonic",
    category: "beverages",
    description: "Fresh wild blackberry extract, rock salt, carbonated craft tonic, and smoked rosemary sprig.",
    price: 290,
    isVeg: true,
    isAvailable: true,
    prepTimeMinutes: 4,
  },
];

export const INITIAL_ORDERS: TableOrder[] = [
  {
    id: "ord-101",
    orderNumber: "ORD-101",
    tableNumber: 4,
    customerName: "Aarav Gupta",
    items: [
      {
        menuItemId: "m-1",
        name: "Truffle & Smoked Cottage Cheese Skewers",
        price: 490,
        quantity: 1,
        notes: "Extra crispy glaze please",
        isVeg: true,
      },
      {
        id: "m-10",
        menuItemId: "m-10",
        name: "Smoked Jamun & Black Salt Tonic",
        price: 290,
        quantity: 2,
        isVeg: true,
      } as any,
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(), // 14 mins ago
    totalAmount: 1070,
    paymentStatus: "pending",
  },
  {
    id: "ord-102",
    orderNumber: "ORD-102",
    tableNumber: 2,
    customerName: "Rohan Mehra",
    items: [
      {
        menuItemId: "m-5",
        name: "Awadhi Dum Ghost Biryani",
        price: 740,
        quantity: 1,
        notes: "Medium spicy with extra burani raita",
        isVeg: false,
      },
      {
        menuItemId: "m-7",
        name: "Garlic & Rosemary Infused Butter Naan",
        price: 140,
        quantity: 2,
        isVeg: true,
      },
    ],
    status: "placed",
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(), // 4 mins ago
    totalAmount: 1020,
    paymentStatus: "pending",
  },
  {
    id: "ord-103",
    orderNumber: "ORD-103",
    tableNumber: 8,
    customerName: "Devika Sen",
    items: [
      {
        menuItemId: "m-4",
        name: "24-Hour Slow-Cooked Dal Vicinix",
        price: 520,
        quantity: 1,
        isVeg: true,
      },
      {
        menuItemId: "m-9",
        name: "Saffron & Pistachio Kulfi Sphere",
        price: 360,
        quantity: 2,
        isVeg: true,
      },
    ],
    status: "served",
    createdAt: new Date(Date.now() - 32 * 60000).toISOString(), // 32 mins ago
    totalAmount: 1240,
    paymentStatus: "paid_online",
  },
];

const MENU_STORAGE_KEY = "vicinix_menu_items_v1";
const ORDERS_STORAGE_KEY = "vicinix_menu_orders_v1";

export function loadStoredMenuItems(): MenuItem[] {
  if (typeof window === "undefined") return INITIAL_MENU_ITEMS;
  try {
    const stored = localStorage.getItem(MENU_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
      return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load menu items", e);
    return INITIAL_MENU_ITEMS;
  }
}

export function saveMenuItemsToStorage(items: MenuItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save menu items", e);
  }
}

export function loadStoredOrders(): TableOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load orders", e);
    return INITIAL_ORDERS;
  }
}

export function saveOrdersToStorage(orders: TableOrder[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save orders", e);
  }
}
