type Product = {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
};

type ProductList = {
  products: Product[];
  paginate: {
    page: number;
    limit: numner;
    page_size: number;
  };
};

type ProductListParams = {
  page?: numner;
  limit?: number;
  sort_by?: 'createAt' | 'view' | 'sold' | 'price';
  order?: 'asc' | 'desc';
  exclude?: string;
  rating_filter?: number;
  price_max?: number;
  price_min?: number;
  name?: string;
};
