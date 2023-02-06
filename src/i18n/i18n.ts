import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PRODUCTS_EN from 'src/locales/en/products.json';
import PRODUCTS_VI from 'src/locales/vi/products.json';
import PRODUCT_EN from 'src/locales/en/product.json';
import PRODUCT_VI from 'src/locales/vi/product.json';

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
};

export const resources = {
  en: {
    //   namespace
    products: PRODUCTS_EN,
    product: PRODUCT_EN
  },
  vi: {
    products: PRODUCTS_VI,
    product: PRODUCT_VI
  }
} as const;

// có công dụng khi chúng ta không có truyền trong những cái hook useTranslate()
export const defaultNS = 'products';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    ns: ['products', 'products'],
    defaultNS,
    fallbackLng: 'vi',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
