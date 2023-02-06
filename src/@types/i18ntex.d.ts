import 'i18next';
import PRODUCTS_EN from 'src/locales/en/products.json';
import PRODUCTS_VI from 'src/locales/vi/products.json';
import PRODUCT_VI from 'src/locales/en/product.json';
import PRODUCT_EN from 'src/locales/vi/product.json';
import { defaultNS, resources } from 'src/i18n/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['vi'];
  }
}
