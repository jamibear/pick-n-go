export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  variant: string;
  sold: number;
  img_url: string;
  created_at: string;
};

export const categories = [
  {
    id: 1,
    category: "Fruit",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  {
    id: 2,
    category: "Vegetables",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 3, category: "Poultry",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 4, category: "Dairy",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 5, category: "Grains",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 6, category: "Herbs & Spices",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 7, category: "Snacks",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 8, category: "Leafy Greens",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 9, category: "Dried Fruits",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
  { id: 10, category: "Ingredients",
    icon: "https://img.icons8.com/emoji/512/mango-emoji.png",
  },
];
