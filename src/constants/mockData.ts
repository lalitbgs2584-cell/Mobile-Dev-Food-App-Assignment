import Ionicons from '@expo/vector-icons/Ionicons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppIconName = keyof typeof Ionicons.glyphMap;

export type CategoryData = {
  id: string;
  label: string;
  iconName: AppIconName;
};

export type RestaurantData = {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: string;
  priceHint: string;
  isNew?: boolean;
};

export type FoodData = {
  id: string;
  name: string;
  restaurant: string;
  cuisine: string;
  image: string;
  rating: number;
  price: string;
  originalPrice?: string;
  deliveryTime: string;
  priceTier?: string;
  tag?: string;
  description: string;
};

export type ListCardData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rating?: number;
  meta?: string;
  price?: string;
  trailingText?: string;
  tag?: string;
};

export type CartLineItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  quantity: number;
};

export type OrderStep = {
  id: string;
  label: string;
  state: 'done' | 'active' | 'pending';
};

export type ProfileMenuItem = {
  id: string;
  title: string;
  iconName: AppIconName;
  trailingText?: string;
};

export type ProfileStat = {
  id: string;
  value: string;
  label: string;
};

export type RestaurantDetail = {
  id: string;
  name: string;
  cuisineLine: string;
  heroImage: string;
  rating: number;
  reviewCount: string;
  deliveryMeta: string;
  description: string;
  recommended: FoodData[];
};

// ─── Static UI Data ───────────────────────────────────────────────────────────

export const onboardingContent = {
  progress: 1,
  buttonLabel: 'Get Started',
};

export const homeHeaderData = {
  userName: 'John Doe',
  address: '221B Baker Street',
  avatarUri: 'https://i.pravatar.cc/160?img=12',
  notificationCount: 3,
};

export const homeCategories: CategoryData[] = [
  { id: 'all',        label: 'All',      iconName: 'grid-outline' },
  { id: 'pizza',      label: 'Pizza',    iconName: 'pizza-outline' },
  { id: 'burger',     label: 'Burger',   iconName: 'fast-food-outline' },
  { id: 'sushi',      label: 'Sushi',    iconName: 'fish-outline' },
  { id: 'dessert',    label: 'Dessert',  iconName: 'ice-cream-outline' },
  { id: 'biryani',    label: 'Biryani',  iconName: 'flame-outline' },
  { id: 'chinese',    label: 'Chinese',  iconName: 'restaurant-outline' },
  { id: 'beverages',  label: 'Drinks',   iconName: 'cafe-outline' },
];

export const promoBannerData = {
  tag: 'Flat',
  headline: '50% OFF',
  subtext: 'on your first order',
  couponCode: 'YUMMY50',
  image:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
};

export const popularSearchTerms = [
  'Pizza', 'Burger', 'Sushi', 'Biryani', 'Pasta', 'Ramen', 'Tacos', 'Dessert',
];

// ─── 50 Food Items ────────────────────────────────────────────────────────────

export const foodData: FoodData[] = [
  // ── Italian ──
  {
    id: 'f1',
    name: 'Creamy Alfredo Pasta',
    restaurant: 'The Pasta House',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$13.99',
    deliveryTime: '25-30 min',
    priceTier: '$$',
    tag: 'Recommended',
    description: 'Rich parmesan sauce with grilled chicken and silky fettuccine.',
  },
  {
    id: 'f2',
    name: 'Spaghetti Bolognese',
    restaurant: 'The Pasta House',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$12.49',
    deliveryTime: '20-25 min',
    priceTier: '$$',
    tag: 'Popular',
    description: 'Slow-cooked meat sauce, basil, and freshly grated pecorino.',
  },
  {
    id: 'f3',
    name: 'Garlic Bread',
    restaurant: 'The Pasta House',
    cuisine: 'Italian',
    image: 'https://plus.unsplash.com/premium_photo-1711752902734-a36167479983?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    price: '$4.99',
    deliveryTime: '15-20 min',
    priceTier: '$',
    description: 'Buttery toasted slices finished with herbs and roasted garlic.',
  },
  {
    id: 'f4',
    name: 'Truffle Mushroom Pizza',
    restaurant: 'Pizza Palace',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$15.99',
    originalPrice: '$18.99',
    deliveryTime: '25-35 min',
    priceTier: '$$$',
    tag: 'Chef Pick',
    description: 'Earthy mushrooms, mozzarella, and truffle oil on a crisp crust.',
  },
  {
    id: 'f5',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$11.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Bestseller',
    description: 'Classic tomato base, fresh mozzarella, basil leaves, and extra virgin olive oil.',
  },
  {
    id: 'f6',
    name: 'Pepperoni Pizza',
    restaurant: 'Pizza Palace',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$13.49',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Popular',
    description: 'Loaded with spicy pepperoni slices, mozzarella, and tangy tomato sauce.',
  },
  {
    id: 'f7',
    name: 'Tiramisu',
    restaurant: 'The Pasta House',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: '$6.99',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Coffee-soaked sponge layered with mascarpone cream and dusted cocoa.',
  },
  {
    id: 'f8',
    name: 'Bruschetta',
    restaurant: 'The Pasta House',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$5.49',
    deliveryTime: '12-18 min',
    priceTier: '$',
    description: 'Tomato, basil, olive oil, and balsamic on toasted sourdough.',
  },
  // ── American / Burgers ──
  {
    id: 'f9',
    name: 'Classic Smash Burger',
    restaurant: 'Burger House',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$11.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: '20% OFF',
    description: 'Double seared beef patties with house sauce and melted cheddar.',
  },
  {
    id: 'f10',
    name: 'BBQ Bacon Burger',
    restaurant: 'Burger House',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$13.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Chef Pick',
    description: 'Smoky BBQ sauce, crispy bacon, caramelized onions and double beef patty.',
  },
  {
    id: 'f11',
    name: 'Loaded Cheese Fries',
    restaurant: 'Burger House',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$6.99',
    deliveryTime: '15-20 min',
    priceTier: '$',
    description: 'Thick-cut fries smothered in cheddar sauce, jalapeños, and sour cream.',
  },
  {
    id: 'f12',
    name: 'Crispy Chicken Sandwich',
    restaurant: 'Burger House',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$10.99',
    originalPrice: '$12.99',
    deliveryTime: '20-25 min',
    priceTier: '$$',
    tag: 'Popular',
    description: 'Buttermilk fried chicken, pickles, coleslaw, and sriracha mayo on a brioche bun.',
  },
  // ── Japanese / Sushi ──
  {
    id: 'f13',
    name: 'Tempura Crunch Roll',
    restaurant: 'Sushi World',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$14.29',
    deliveryTime: '30-40 min',
    priceTier: '$$$',
    description: 'Shrimp tempura roll with avocado, sesame, and spicy mayo.',
  },
  {
    id: 'f14',
    name: 'Salmon Sashimi',
    restaurant: 'Sushi World',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: '$17.99',
    deliveryTime: '30-40 min',
    priceTier: '$$$',
    tag: 'Premium',
    description: 'Fresh Atlantic salmon sashimi slices served with wasabi and pickled ginger.',
  },
  {
    id: 'f15',
    name: 'Dragon Roll',
    restaurant: 'Sushi World',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$16.49',
    deliveryTime: '30-40 min',
    priceTier: '$$$',
    tag: 'Bestseller',
    description: 'Eel and cucumber inside, avocado draped on top with unagi sauce.',
  },
  {
    id: 'f16',
    name: 'Dragon Ramen',
    restaurant: 'Nori Lane',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$13.49',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    description: 'Spicy broth, charred corn, soft egg, and slow-braised chicken.',
  },
  {
    id: 'f17',
    name: 'Tonkotsu Ramen',
    restaurant: 'Nori Lane',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$14.99',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    tag: 'Chef Pick',
    description: 'Rich pork bone broth, chashu pork belly, soft-boiled egg, and bamboo shoots.',
  },
  {
    id: 'f18',
    name: 'Gyoza (6 pcs)',
    restaurant: 'Nori Lane',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1625938145744-533988bbb1dd?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$7.99',
    deliveryTime: '20-25 min',
    priceTier: '$',
    description: 'Pan-fried pork and cabbage dumplings with a sesame-soy dipping sauce.',
  },
  // ── Indian / Biryani ──
  {
    id: 'f19',
    name: 'Chicken Dum Biryani',
    restaurant: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: '$14.99',
    deliveryTime: '30-40 min',
    priceTier: '$$',
    tag: 'Bestseller',
    description: 'Slow-cooked aromatic basmati rice with tender chicken and saffron.',
  },
  {
    id: 'f20',
    name: 'Butter Chicken',
    restaurant: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$13.99',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    tag: 'Popular',
    description: 'Tender chicken in a velvety tomato-cream sauce with naan bread.',
  },
  {
    id: 'f21',
    name: 'Paneer Tikka Masala',
    restaurant: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$12.99',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    description: 'Charred cottage cheese in spiced tomato-onion gravy with butter naan.',
  },
  {
    id: 'f22',
    name: 'Garlic Naan',
    restaurant: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$3.49',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Soft leavened flatbread topped with garlic butter and fresh coriander.',
  },
  {
    id: 'f23',
    name: 'Mutton Seekh Kebab',
    restaurant: 'Kebab King',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$15.99',
    deliveryTime: '30-40 min',
    priceTier: '$$$',
    tag: 'Chef Pick',
    description: 'Minced mutton mixed with spices, grilled on skewers in a tandoor oven.',
  },
  {
    id: 'f24',
    name: 'Dal Makhani',
    restaurant: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$10.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    description: 'Slow-simmered black lentils in a rich buttery tomato cream sauce.',
  },
  // ── Mexican ──
  {
    id: 'f25',
    name: 'Carne Asada Tacos',
    restaurant: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$9.99',
    deliveryTime: '15-25 min',
    priceTier: '$',
    tag: 'Popular',
    description: 'Grilled marinated beef with salsa verde, onion, and cilantro on corn tortillas.',
  },
  {
    id: 'f26',
    name: 'Chicken Quesadilla',
    restaurant: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$8.99',
    deliveryTime: '15-20 min',
    priceTier: '$',
    description: 'Flour tortilla stuffed with grilled chicken, peppers, cheese, and chipotle sauce.',
  },
  {
    id: 'f27',
    name: 'Loaded Nachos',
    restaurant: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$10.99',
    deliveryTime: '15-25 min',
    priceTier: '$$',
    tag: 'Sharable',
    description: 'Tortilla chips topped with beans, jalapeños, guacamole, cheese, and sour cream.',
  },
  {
    id: 'f28',
    name: 'Beef Burrito Bowl',
    restaurant: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1593906265913-a8b0aa6d3117?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$11.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    description: 'Seasoned ground beef, cilantro rice, black beans, pico de gallo, and guac.',
  },
  // ── Chinese ──
  {
    id: 'f29',
    name: 'Kung Pao Chicken',
    restaurant: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$12.99',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    tag: 'Spicy',
    description: 'Stir-fried chicken with peanuts, dried chilies, and a savory-sweet sauce.',
  },
  {
    id: 'f30',
    name: 'Dim Sum Basket',
    restaurant: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$9.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Recommended',
    description: 'Steamed assortment of har gow, siu mai, and char siu bao.',
  },
  {
    id: 'f31',
    name: 'Peking Duck',
    restaurant: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: '$24.99',
    deliveryTime: '35-45 min',
    priceTier: '$$$',
    tag: 'Premium',
    description: 'Crispy lacquered duck with scallions, cucumber, and hoisin in pancakes.',
  },
  {
    id: 'f32',
    name: 'Vegetable Fried Rice',
    restaurant: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    rating: 4.4,
    price: '$8.49',
    deliveryTime: '20-25 min',
    priceTier: '$',
    description: 'Wok-tossed jasmine rice with seasonal vegetables, egg, and soy sauce.',
  },
  // ── Mediterranean ──
  {
    id: 'f33',
    name: 'Falafel Bowl',
    restaurant: 'Olive Grove',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$10.99',
    deliveryTime: '20-28 min',
    priceTier: '$$',
    description: 'Crunchy falafel with hummus, pickled onions, and herb rice.',
  },
  {
    id: 'f34',
    name: 'Lamb Shawarma Wrap',
    restaurant: 'Olive Grove',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$11.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Bestseller',
    description: 'Marinated lamb slow-roasted, wrapped with garlic sauce, pickles, and sumac onions.',
  },
  {
    id: 'f35',
    name: 'Greek Salad',
    restaurant: 'Olive Grove',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$8.49',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Crisp cucumbers, tomatoes, olives, red onion, and creamy feta with oregano.',
  },
  // ── Desserts ──
  {
    id: 'f36',
    name: 'Molten Lava Cake',
    restaurant: 'Sweet Crumbs',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$6.49',
    deliveryTime: '18-24 min',
    priceTier: '$$',
    description: 'Warm chocolate sponge with a gooey center and vanilla cream.',
  },
  {
    id: 'f37',
    name: 'New York Cheesecake',
    restaurant: 'Sweet Crumbs',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$5.99',
    deliveryTime: '10-15 min',
    priceTier: '$',
    tag: 'Popular',
    description: 'Dense and creamy classic cheesecake on a buttery graham cracker crust.',
  },
  {
    id: 'f38',
    name: 'Gulab Jamun (6 pcs)',
    restaurant: 'Spice Garden',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1601303516534-bf4c3d07b3a1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$4.99',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Soft milk-solid dumplings soaked in rose-cardamom sugar syrup.',
  },
  {
    id: 'f39',
    name: 'Mango Kulfi',
    restaurant: 'Spice Garden',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$4.49',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Dense Indian ice cream made with condensed milk, fresh mango, and cardamom.',
  },
  // ── Beverages ──
  {
    id: 'f40',
    name: 'Berry Smoothie',
    restaurant: 'Juice Lab',
    cuisine: 'Beverage',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$4.99',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Blueberry, strawberry, yogurt, and honey blended chilled.',
  },
  {
    id: 'f41',
    name: 'Mango Lassi',
    restaurant: 'Spice Garden',
    cuisine: 'Beverage',
    image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$3.99',
    deliveryTime: '10-15 min',
    priceTier: '$',
    tag: 'Refreshing',
    description: 'Chilled blended yogurt drink with ripe Alphonso mango and cardamom.',
  },
  {
    id: 'f42',
    name: 'Cold Brew Coffee',
    restaurant: 'Juice Lab',
    cuisine: 'Beverage',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$4.49',
    deliveryTime: '8-12 min',
    priceTier: '$',
    description: '18-hour cold-steeped Arabica brew served over ice with oat milk.',
  },
  // ── Korean ──
  {
    id: 'f43',
    name: 'Korean Fried Chicken',
    restaurant: 'Seoul Kitchen',
    cuisine: 'Korean',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$14.99',
    originalPrice: '$17.99',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    tag: 'Bestseller',
    description: 'Double-fried crispy chicken glazed with sweet-gochujang sauce and sesame.',
  },
  {
    id: 'f44',
    name: 'Bibimbap',
    restaurant: 'Seoul Kitchen',
    cuisine: 'Korean',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$12.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Healthy',
    description: 'Stone-pot rice with seasonal vegetables, fried egg, and gochujang sauce.',
  },
  {
    id: 'f45',
    name: 'Tteokbokki',
    restaurant: 'Seoul Kitchen',
    cuisine: 'Korean',
    image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$9.99',
    deliveryTime: '20-25 min',
    priceTier: '$',
    tag: 'Spicy',
    description: 'Chewy rice cakes simmered in spicy-sweet gochujang sauce with fish cake.',
  },
  // ── Thai ──
  {
    id: 'f46',
    name: 'Pad Thai',
    restaurant: 'Bangkok Street',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$12.49',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Popular',
    description: 'Stir-fried rice noodles with shrimp, tofu, bean sprouts, and tamarind sauce.',
  },
  {
    id: 'f47',
    name: 'Green Curry',
    restaurant: 'Bangkok Street',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$13.49',
    deliveryTime: '25-35 min',
    priceTier: '$$',
    tag: 'Chef Pick',
    description: 'Aromatic green curry with chicken, Thai eggplant, and jasmine rice.',
  },
  {
    id: 'f48',
    name: 'Tom Yum Soup',
    restaurant: 'Bangkok Street',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: '$8.99',
    deliveryTime: '15-25 min',
    priceTier: '$',
    description: 'Hot and sour broth with shrimp, mushrooms, lemongrass, and kaffir lime.',
  },
  // ── Healthy / Salads ──
  {
    id: 'f49',
    name: 'Acai Power Bowl',
    restaurant: 'Juice Lab',
    cuisine: 'Healthy',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: '$9.99',
    deliveryTime: '10-15 min',
    priceTier: '$$',
    tag: 'Healthy',
    description: 'Blended acai base topped with granola, banana, blueberries, and honey.',
  },
  {
    id: 'f50',
    name: 'Caesar Salad',
    restaurant: 'Olive Grove',
    cuisine: 'Healthy',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$9.49',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Crisp romaine, shaved parmesan, croutons, and house Caesar dressing.',
  },
  {
    id: 'f51',
    name: 'Avocado Toast',
    restaurant: 'Juice Lab',
    cuisine: 'Healthy',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: '$7.49',
    deliveryTime: '10-15 min',
    priceTier: '$',
    description: 'Smashed avocado on multigrain toast with cherry tomatoes, microgreens, and chilli flakes.',
  },
  {
    id: 'f52',
    name: 'Chicken Shawarma Platter',
    restaurant: 'Kebab King',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: '$13.99',
    deliveryTime: '20-30 min',
    priceTier: '$$',
    tag: 'Bestseller',
    description: 'Spice-marinated rotisserie chicken with garlic sauce, fries, and pickled vegetables.',
  },
];

// ─── 25 Restaurants ───────────────────────────────────────────────────────────

export const popularRestaurants: RestaurantData[] = [
  {
    id: 'r1',
    name: 'Burger House',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    deliveryTime: '20-30 min',
    priceHint: 'From $10',
  },
  {
    id: 'r2',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '25-35 min',
    priceHint: 'From $12',
  },
  {
    id: 'r3',
    name: 'Sushi World',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '30-40 min',
    priceHint: 'From $14',
    isNew: true,
  },
  {
    id: 'r4',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    deliveryTime: '15-25 min',
    priceHint: 'From $9',
  },
  {
    id: 'r5',
    name: 'The Pasta House',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '25-30 min',
    priceHint: 'From $11',
  },
  {
    id: 'r6',
    name: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '30-40 min',
    priceHint: 'From $11',
    isNew: true,
  },
  {
    id: 'r7',
    name: 'Nori Lane',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '25-35 min',
    priceHint: 'From $13',
  },
  {
    id: 'r8',
    name: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    deliveryTime: '20-30 min',
    priceHint: 'From $9',
  },
  {
    id: 'r9',
    name: 'Olive Grove',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    deliveryTime: '20-28 min',
    priceHint: 'From $10',
  },
  {
    id: 'r10',
    name: 'Sweet Crumbs',
    cuisine: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '15-20 min',
    priceHint: 'From $5',
  },
  {
    id: 'r11',
    name: 'Juice Lab',
    cuisine: 'Beverages & Healthy',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    deliveryTime: '10-15 min',
    priceHint: 'From $4',
  },
  {
    id: 'r12',
    name: 'Seoul Kitchen',
    cuisine: 'Korean',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceHint: 'From $12',
    isNew: true,
  },
  {
    id: 'r13',
    name: 'Bangkok Street',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '20-30 min',
    priceHint: 'From $11',
  },
  {
    id: 'r14',
    name: 'Kebab King',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '20-30 min',
    priceHint: 'From $13',
  },
  {
    id: 'r15',
    name: 'The Steak Club',
    cuisine: 'American · Steakhouse',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    deliveryTime: '35-45 min',
    priceHint: 'From $22',
  },
  {
    id: 'r16',
    name: 'Pho Saigon',
    cuisine: 'Vietnamese',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    deliveryTime: '25-35 min',
    priceHint: 'From $10',
  },
  {
    id: 'r17',
    name: 'Waffles & More',
    cuisine: 'Breakfast · Brunch',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    deliveryTime: '15-25 min',
    priceHint: 'From $8',
    isNew: true,
  },
  {
    id: 'r18',
    name: 'The Taco Lab',
    cuisine: 'Mexican · Fusion',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    deliveryTime: '20-30 min',
    priceHint: 'From $9',
  },
  {
    id: 'r19',
    name: 'Mumbai Dabbawala',
    cuisine: 'Indian · Street Food',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '25-35 min',
    priceHint: 'From $8',
  },
  {
    id: 'r20',
    name: 'Crêpe Café',
    cuisine: 'French',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    deliveryTime: '20-30 min',
    priceHint: 'From $9',
  },
  {
    id: 'r21',
    name: 'The BBQ Pit',
    cuisine: 'American · BBQ',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    deliveryTime: '30-40 min',
    priceHint: 'From $14',
  },
  {
    id: 'r22',
    name: 'Dim Sum Dynasty',
    cuisine: 'Chinese · Dim Sum',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceHint: 'From $11',
    isNew: true,
  },
  {
    id: 'r23',
    name: 'Açaí Bros',
    cuisine: 'Healthy · Vegan',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    deliveryTime: '10-20 min',
    priceHint: 'From $8',
  },
  {
    id: 'r24',
    name: 'Bombay Brasserie',
    cuisine: 'Indian · Fine Dining',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    deliveryTime: '35-45 min',
    priceHint: 'From $18',
  },
  {
    id: 'r25',
    name: 'Pasta Fresca',
    cuisine: 'Italian · Handmade Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceHint: 'From $13',
    isNew: true,
  },
];

// ─── Restaurant Detail Map ─────────────────────────────────────────────────────

export const restaurantDetails: Record<string, RestaurantDetail> = {
  r1: {
    id: 'r1',
    name: 'Burger House',
    cuisineLine: 'American  ·  Burgers  ·  Fast Food',
    heroImage: popularRestaurants[0].image,
    rating: 4.6,
    reviewCount: '2.1k',
    deliveryMeta: '20-30 min  ·  $1.99 Delivery',
    description: 'Juicy smash burgers made fresh to order with 100% prime beef and house-made sauces.',
    recommended: [foodData[8], foodData[9], foodData[10], foodData[11]],
  },
  r2: {
    id: 'r2',
    name: 'Pizza Palace',
    cuisineLine: 'Italian  ·  Pizza  ·  Casual Dining',
    heroImage: popularRestaurants[1].image,
    rating: 4.7,
    reviewCount: '3.4k',
    deliveryMeta: '25-35 min  ·  $2.49 Delivery',
    description: 'Wood-fired pizzas with slow-fermented dough, fresh mozzarella, and signature tomato sauce.',
    recommended: [foodData[3], foodData[4], foodData[5]],
  },
  r3: {
    id: 'r3',
    name: 'Sushi World',
    cuisineLine: 'Japanese  ·  Sushi  ·  Fine Dining',
    heroImage: popularRestaurants[2].image,
    rating: 4.8,
    reviewCount: '1.8k',
    deliveryMeta: '30-40 min  ·  $3.49 Delivery',
    description: 'Premium omakase-inspired rolls and sashimi crafted by master chefs using daily-fresh fish.',
    recommended: [foodData[12], foodData[13], foodData[14]],
  },
  r4: {
    id: 'r4',
    name: 'Taco Fiesta',
    cuisineLine: 'Mexican  ·  Tacos  ·  Street Food',
    heroImage: popularRestaurants[3].image,
    rating: 4.5,
    reviewCount: '980',
    deliveryMeta: '15-25 min  ·  $0.99 Delivery',
    description: 'Authentic street-style tacos with handmade tortillas and bold, vibrant flavors.',
    recommended: [foodData[24], foodData[25], foodData[26], foodData[27]],
  },
  r5: {
    id: 'r5',
    name: 'The Pasta House',
    cuisineLine: 'Italian  ·  Pasta  ·  Casual Dining',
    heroImage: popularRestaurants[4].image,
    rating: 4.7,
    reviewCount: '1.2k',
    deliveryMeta: '25-30 min  ·  $2.99 Delivery',
    description: 'Authentic Italian pasta made with love and the finest imported ingredients from Naples.',
    recommended: [foodData[0], foodData[1], foodData[2], foodData[6], foodData[7]],
  },
  r6: {
    id: 'r6',
    name: 'Spice Garden',
    cuisineLine: 'Indian  ·  Curries  ·  Biryani',
    heroImage: popularRestaurants[5].image,
    rating: 4.8,
    reviewCount: '2.6k',
    deliveryMeta: '30-40 min  ·  $2.49 Delivery',
    description: 'Northern Indian cuisine with aromatic curries, slow-cooked biryanis, and fresh-baked naans.',
    recommended: [foodData[18], foodData[19], foodData[20], foodData[21], foodData[23], foodData[37], foodData[40]],
  },
  r7: {
    id: 'r7',
    name: 'Nori Lane',
    cuisineLine: 'Japanese  ·  Ramen  ·  Gyoza',
    heroImage: popularRestaurants[6].image,
    rating: 4.7,
    reviewCount: '1.5k',
    deliveryMeta: '25-35 min  ·  $2.99 Delivery',
    description: 'Soulful Japanese ramen with 18-hour broths, hand-pulled noodles, and traditional toppings.',
    recommended: [foodData[15], foodData[16], foodData[17]],
  },
  r8: {
    id: 'r8',
    name: 'Dragon Wok',
    cuisineLine: 'Chinese  ·  Cantonese  ·  Dim Sum',
    heroImage: popularRestaurants[7].image,
    rating: 4.5,
    reviewCount: '1.1k',
    deliveryMeta: '20-30 min  ·  $1.99 Delivery',
    description: 'Traditional Cantonese cooking with bold wok-fired flavors and authentic dim sum.',
    recommended: [foodData[28], foodData[29], foodData[30], foodData[31]],
  },
  r9: {
    id: 'r9',
    name: 'Olive Grove',
    cuisineLine: 'Mediterranean  ·  Salads  ·  Wraps',
    heroImage: popularRestaurants[8].image,
    rating: 4.6,
    reviewCount: '870',
    deliveryMeta: '20-28 min  ·  $1.49 Delivery',
    description: 'Fresh Mediterranean fare with house-made hummus, falafel, and signature shawarma.',
    recommended: [foodData[32], foodData[33], foodData[34], foodData[49]],
  },
  r10: {
    id: 'r10',
    name: 'Sweet Crumbs',
    cuisineLine: 'Desserts  ·  Cakes  ·  Pastries',
    heroImage: popularRestaurants[9].image,
    rating: 4.8,
    reviewCount: '760',
    deliveryMeta: '15-20 min  ·  $1.99 Delivery',
    description: 'Artisan desserts and pastries baked fresh daily with premium Belgian chocolate.',
    recommended: [foodData[35], foodData[36]],
  },
  r11: {
    id: 'r11',
    name: 'Juice Lab',
    cuisineLine: 'Beverages  ·  Healthy  ·  Smoothies',
    heroImage: popularRestaurants[10].image,
    rating: 4.5,
    reviewCount: '540',
    deliveryMeta: '10-15 min  ·  $0.99 Delivery',
    description: 'Cold-pressed juices, protein smoothies, and power bowls for a healthier you.',
    recommended: [foodData[39], foodData[41], foodData[48], foodData[50]],
  },
  r12: {
    id: 'r12',
    name: 'Seoul Kitchen',
    cuisineLine: 'Korean  ·  Fried Chicken  ·  BBQ',
    heroImage: popularRestaurants[11].image,
    rating: 4.8,
    reviewCount: '1.3k',
    deliveryMeta: '25-35 min  ·  $2.49 Delivery',
    description: 'Authentic Korean comfort food — double-fried chicken, rice bowls, and spicy street snacks.',
    recommended: [foodData[42], foodData[43], foodData[44]],
  },
  r13: {
    id: 'r13',
    name: 'Bangkok Street',
    cuisineLine: 'Thai  ·  Curries  ·  Noodles',
    heroImage: popularRestaurants[12].image,
    rating: 4.7,
    reviewCount: '990',
    deliveryMeta: '20-30 min  ·  $2.49 Delivery',
    description: 'Street-style Thai cuisine with aromatic curries, tangy soups, and wok-tossed noodles.',
    recommended: [foodData[45], foodData[46], foodData[47]],
  },
  r14: {
    id: 'r14',
    name: 'Kebab King',
    cuisineLine: 'Mediterranean  ·  Kebabs  ·  Grills',
    heroImage: popularRestaurants[13].image,
    rating: 4.8,
    reviewCount: '1.7k',
    deliveryMeta: '20-30 min  ·  $1.99 Delivery',
    description: 'Charcoal-grilled seekh kebabs and shawarma platters with signature garlic chutney.',
    recommended: [foodData[22], foodData[51]],
  },
  r15: {
    id: 'r15',
    name: 'The Steak Club',
    cuisineLine: 'American  ·  Steakhouse  ·  Fine Dining',
    heroImage: popularRestaurants[14].image,
    rating: 4.9,
    reviewCount: '2.0k',
    deliveryMeta: '35-45 min  ·  $4.99 Delivery',
    description: 'Premium dry-aged cuts cooked to perfection in a cast-iron skillet with herb butter.',
    recommended: [foodData[8], foodData[9]],
  },
  r16: {
    id: 'r16',
    name: 'Pho Saigon',
    cuisineLine: 'Vietnamese  ·  Pho  ·  Banh Mi',
    heroImage: popularRestaurants[15].image,
    rating: 4.6,
    reviewCount: '730',
    deliveryMeta: '25-35 min  ·  $2.49 Delivery',
    description: 'Slow-simmered Vietnamese pho with fresh herbs, rice noodles, and rich bone broth.',
    recommended: [foodData[15], foodData[47]],
  },
  r17: {
    id: 'r17',
    name: 'Waffles & More',
    cuisineLine: 'Breakfast  ·  Brunch  ·  Waffles',
    heroImage: popularRestaurants[16].image,
    rating: 4.6,
    reviewCount: '620',
    deliveryMeta: '15-25 min  ·  $1.49 Delivery',
    description: 'Fluffy Belgian waffles, stacked pancakes, and wholesome brunch bowls all day long.',
    recommended: [foodData[50], foodData[39], foodData[41]],
  },
  r18: {
    id: 'r18',
    name: 'The Taco Lab',
    cuisineLine: 'Mexican  ·  Fusion  ·  Burritos',
    heroImage: popularRestaurants[17].image,
    rating: 4.5,
    reviewCount: '560',
    deliveryMeta: '20-30 min  ·  $1.49 Delivery',
    description: 'Experimental Mexican fusion tacos with unexpected fillings and bold sauces.',
    recommended: [foodData[24], foodData[25], foodData[26], foodData[27]],
  },
  r19: {
    id: 'r19',
    name: 'Mumbai Dabbawala',
    cuisineLine: 'Indian  ·  Street Food  ·  Chaat',
    heroImage: popularRestaurants[18].image,
    rating: 4.7,
    reviewCount: '1.4k',
    deliveryMeta: '25-35 min  ·  $1.99 Delivery',
    description: 'Mumbai-inspired street food — pav bhaji, vada pav, and chaats bursting with flavor.',
    recommended: [foodData[20], foodData[21], foodData[23], foodData[37]],
  },
  r20: {
    id: 'r20',
    name: 'Crêpe Café',
    cuisineLine: 'French  ·  Crêpes  ·  Galettes',
    heroImage: popularRestaurants[19].image,
    rating: 4.6,
    reviewCount: '490',
    deliveryMeta: '20-30 min  ·  $2.49 Delivery',
    description: 'Classic French crêpes with sweet and savory fillings, made with organic flour and eggs.',
    recommended: [foodData[36], foodData[7], foodData[6]],
  },
  r21: {
    id: 'r21',
    name: 'The BBQ Pit',
    cuisineLine: 'American  ·  BBQ  ·  Smoked Meats',
    heroImage: popularRestaurants[20].image,
    rating: 4.7,
    reviewCount: '1.1k',
    deliveryMeta: '30-40 min  ·  $2.99 Delivery',
    description: 'Low and slow smoked brisket, ribs, and pulled pork with tangy house BBQ sauce.',
    recommended: [foodData[9], foodData[10], foodData[11]],
  },
  r22: {
    id: 'r22',
    name: 'Dim Sum Dynasty',
    cuisineLine: 'Chinese  ·  Dim Sum  ·  Tea House',
    heroImage: popularRestaurants[21].image,
    rating: 4.8,
    reviewCount: '890',
    deliveryMeta: '25-35 min  ·  $2.49 Delivery',
    description: 'Traditional Cantonese dim sum handcrafted fresh every morning by experienced chefs.',
    recommended: [foodData[28], foodData[29], foodData[31]],
  },
  r23: {
    id: 'r23',
    name: 'Açaí Bros',
    cuisineLine: 'Healthy  ·  Vegan  ·  Bowls',
    heroImage: popularRestaurants[22].image,
    rating: 4.5,
    reviewCount: '410',
    deliveryMeta: '10-20 min  ·  $0.99 Delivery',
    description: 'Nutrient-packed açaí bowls, green smoothies, and plant-based snacks for guilt-free indulgence.',
    recommended: [foodData[48], foodData[49], foodData[50], foodData[39]],
  },
  r24: {
    id: 'r24',
    name: 'Bombay Brasserie',
    cuisineLine: 'Indian  ·  Fine Dining  ·  Mughlai',
    heroImage: popularRestaurants[23].image,
    rating: 4.9,
    reviewCount: '2.3k',
    deliveryMeta: '35-45 min  ·  $3.99 Delivery',
    description: 'Elevated Mughlai and Awadhi cuisine with royal recipes, dum-cooking, and premium ingredients.',
    recommended: [foodData[18], foodData[19], foodData[22], foodData[23], foodData[38]],
  },
  r25: {
    id: 'r25',
    name: 'Pasta Fresca',
    cuisineLine: 'Italian  ·  Handmade Pasta  ·  Risotto',
    heroImage: popularRestaurants[24].image,
    rating: 4.8,
    reviewCount: '1.0k',
    deliveryMeta: '25-35 min  ·  $2.99 Delivery',
    description: 'Fresh egg pasta rolled and cut in-house daily, served with seasonal Italian sauces.',
    recommended: [foodData[0], foodData[1], foodData[3], foodData[6]],
  },
};

// ─── Derived Data ─────────────────────────────────────────────────────────────

const findRestaurantById = (id: string) =>
  popularRestaurants.find((restaurant) => restaurant.id === id);

const findFoodById = (id: string) =>
  foodData.find((food) => food.id === id);

const cleanDisplayText = (value: string) =>
  value.replace(/Â·/g, '·').replace(/â€”/g, '—');

const curatedHomeRestaurantIds = [
  'r5',
  'r6',
  'r3',
  'r12',
  'r13',
  'r14',
  'r24',
  'r25',
  'r15',
  'r22',
];

const curatedTopPickIds = [
  'f1',
  'f4',
  'f9',
  'f13',
  'f19',
  'f25',
  'f29',
  'f33',
];

export const homePopularRestaurants: RestaurantData[] =
  curatedHomeRestaurantIds
    .map(findRestaurantById)
    .filter((restaurant): restaurant is RestaurantData => Boolean(restaurant));

export const topPicksData: FoodData[] = curatedTopPickIds
  .map(findFoodById)
  .filter((food): food is FoodData => Boolean(food));

export const recommendedFoodCards: ListCardData[] = topPicksData
  .slice(0, 6)
  .map((food) => ({
    id: `rf_${food.id}`,
    title: cleanDisplayText(food.name),
    subtitle: cleanDisplayText(food.restaurant),
    image: food.image,
    rating: food.rating,
    price: food.price,
    meta: food.deliveryTime,
    tag: food.tag ? cleanDisplayText(food.tag) : undefined,
  }));

export const nearbyRestaurantCards: ListCardData[] = homePopularRestaurants
  .slice(0, 8)
  .map((restaurant) => ({
    id: `sr_${restaurant.id}`,
    title: cleanDisplayText(restaurant.name),
    subtitle: cleanDisplayText(restaurant.cuisine),
    image: restaurant.image,
    rating: restaurant.rating,
    meta: restaurant.deliveryTime,
    trailingText: restaurant.priceHint.replace('From ', ''),
  }));

// ─── Cart, Orders, Profile ────────────────────────────────────────────────────

export const cartData = {
  items: [
    {
      id: 'c1',
      title: 'Creamy Alfredo Pasta',
      subtitle: 'The Pasta House',
      image: foodData[0].image,
      price: '$13.99',
      quantity: 1,
    },
    {
      id: 'c2',
      title: 'Spaghetti Bolognese',
      subtitle: 'The Pasta House',
      image: foodData[1].image,
      price: '$12.49',
      quantity: 1,
    },
  ] satisfies CartLineItem[],
  suggestions: [
    { id: 's1', title: 'Tiramisu', subtitle: 'Dessert', image: foodData[6].image, price: '$6.99' },
    { id: 's2', title: 'Bruschetta', subtitle: 'Starter', image: foodData[7].image, price: '$5.49' },
    { id: 's3', title: 'Garlic Bread', subtitle: 'Side', image: foodData[2].image, price: '$4.99' },
    { id: 's4', title: 'Lava Cake', subtitle: 'Dessert', image: foodData[35].image, price: '$6.49' },
  ] satisfies ListCardData[],
  summary: {
    subtotal:        '$26.48',
    deliveryFee:     '$2.99',
    total:           '$29.47',
    savingsMessage:  "You're saving $6.00 on delivery!",
  },
};

export const currentOrderData = {
  restaurant: 'The Pasta House',
  orderId:    '#ORD1234',
  statusText: 'On the way',
  eta:        '20-25 min',
  rider: {
    name:       'John Doe',
    role:       'Rider is on the way',
    avatarUri:  'https://i.pravatar.cc/160?img=15',
    rating:     '4.9',
  },
  steps: [
    { id: 'st1', label: 'Confirmed',  state: 'done'    },
    { id: 'st2', label: 'Preparing',  state: 'done'    },
    { id: 'st3', label: 'On the way', state: 'active'  },
    { id: 'st4', label: 'Delivered',  state: 'pending' },
  ] satisfies OrderStep[],
};

export const pastOrdersData: ListCardData[] = [
  {
    id:          'p1',
    title:       'Burger House',
    subtitle:    '2 items  ·  Yesterday',
    image:       popularRestaurants[0].image,
    rating:      4.6,
    meta:        '$18.40',
    trailingText:'Delivered',
  },
  {
    id:          'p2',
    title:       'Pizza Palace',
    subtitle:    '1 item  ·  Tue',
    image:       popularRestaurants[1].image,
    rating:      4.7,
    meta:        '$15.99',
    trailingText:'Delivered',
  },
];

export const orderSuccessData = {
  title:   'Order Placed Successfully!',
  message: "We've received your order and it is on the way.",
  orderId: '#ORD1234',
};

export const profileData = {
  name:       'John Doe',
  email:      'john.doe@email.com',
  membership: 'Gold Member',
  avatarUri:  'https://i.pravatar.cc/160?img=12',
  stats: [
    { id: 'ps1', value: '12',  label: 'Orders'  },
    { id: 'ps2', value: '4.8', label: 'Rating'  },
    { id: 'ps3', value: '$56', label: 'Credits' },
  ] satisfies ProfileStat[],
  menu: [
    { id: 'pm1', title: 'My Orders', iconName: 'receipt-outline' },
    { id: 'pm2', title: 'Settings', iconName: 'settings-outline' },
    { id: 'pm3', title: 'Help', iconName: 'help-circle-outline' },
    { id: 'pm4', title: 'Logout', iconName: 'log-out-outline' },
  ] satisfies ProfileMenuItem[],
};

// Legacy export kept for backward compatibility
export const featuredRestaurant = restaurantDetails['r5'];
