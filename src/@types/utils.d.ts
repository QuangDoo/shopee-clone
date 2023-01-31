type ResponseApi<Data> = {
  message: string;
  data?: Data;
};
// cú pháp -? sẽ loại bỏ key undefined của key optional
type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
