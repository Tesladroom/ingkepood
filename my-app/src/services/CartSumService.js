import { Subject } from "rxjs";

const cartChanged = new Subject();

export const cartSumService = {
  sendCartSum: cartSum => cartChanged.next(cartSum),
  getCartSum: () => cartChanged.asObservable()
}