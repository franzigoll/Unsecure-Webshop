import {Component, Input} from "@angular/core";
import {SpecifiedItem} from "../../../data-access/models/";
import {ShoppingCartStore} from "../../../data-access/service/store/shoppingCart.store";

@Component({
  selector: 'order-items',
  templateUrl: './orderItems.component.html',
  styleUrls: ['./orderItems.component.scss']
})
export class OrderItemsComponent {

  // @ts-ignore
  @Input() itemList: SpecifiedItem[];

  couponPercent: number = 0;

  constructor(private shoppingCartStore: ShoppingCartStore) {
  }

  onItemDelete(itemId: number): void {
    this.shoppingCartStore.deleteItem(itemId);
  }

  onUpdateItemQuantity(itemId: number, quantity: number): void {
    this.shoppingCartStore.updateItem(itemId, quantity);
  }

  getTotalAmount(): number {
    let totalAmount: number = 0;
    for (let item of this.itemList) {
      if (item.amount)
        totalAmount += item.amount * item.quantity;
    }
    return totalAmount;
  }

}
