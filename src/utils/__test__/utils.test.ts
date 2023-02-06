import { isAxiosError, isAxiosUnauthorizedError, isAxiosUnprocessableEntityError } from './../utils';
import { describe, it, expect } from 'vitest';
import { AxiosError, HttpStatusCode } from 'axios';

// Describe dùng để mô tả tập hợp các ngữ cảnh hoặc
// 1 đơn vị cần test: Ví dụ test function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError return to boolean type', () => {
    // dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError return to boolean type', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true);
  });
});

describe('isAxiosUnauthorizedEntity', () => {
  it('isAxiosUnauthorizedEntity return boolean type', () => {
    // check arg là error. expect => false
    expect(isAxiosUnauthorizedError(new Error())).toBeFalsy();
    //   check response là === HttpStatusCode.Unauthorized (401). expect => true
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBeTruthy();
  });
});
