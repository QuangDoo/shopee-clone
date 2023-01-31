export const PurchasesStatus = {
  inCart: -1,
  all: 0,
  waitForConfirmation: 1,
  waitForGetting: 2,
  inProgress: 3,
  delivery: 4,
  cancelled: 5
} as const;
