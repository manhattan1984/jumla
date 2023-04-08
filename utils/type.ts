export type ProductType = {
  id: string;
  name: string;
  description: string;
  permalink: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
  };
  image: {
    url: string;
  };
  variant_groups: {
    id: string;
    name: string;
    options: {
      id: string;
      price: { formatted_with_symbol: string };
      name: string;
    }[];
  }[];
  assets: {
    id: string;
    url: string;
    filename: string;
  }[];
};

export type VariantType = {
  id: string;
  sku: string | null;
  description: string | null;
  inventory: number | null;
  price: { formatted_with_symbol: string } | null;
  assets: {
    id: string;
    url: string;
    filename: string;
  }[];
};

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  assets: {
    url: string;
  }[];
};
