import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Address, Article, Contact, Coupon, Order, SpecifiedItem, User} from "../models";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly url: string = 'http://localhost:4200/api/';

  constructor(private httpClient: HttpClient) {
  }

  getArtricles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.url + 'articles');
  }

  getArticlesByBrand(brand: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.url + 'articles?brand=' + brand + '&page=8');
  }

  getArticleById(articleNumber: number): Observable<Article> {
    return this.httpClient.get<Article>(this.url + 'articles/' + articleNumber);
  }

  getArticlesFrontpage(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.url + 'articles?page=1&specifications=false');
  }

  loadOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url + 'orders');
  }

  loadOrdersWithFullBody(orderNumber: number): Observable<Order> {
    return this.httpClient.get<Order>(this.url + 'orders/' + orderNumber);
  }

  getImageById(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'pictures/' + id, {responseType: 'text'});
  }

  postOrder(order: Order): Observable<string> {
    // @ts-ignore
    return this.httpClient.post<string>(this.url + 'orders/', {...order}, {observe: "response"}).pipe(
      map(resp => {
        return resp.headers.get("Location")
      })
    );
  }

  addItemToShoppingCart(item: SpecifiedItem): Observable<any> {
    return this.httpClient.post(this.url + 'cart/items/', {...item});
  }

  createAddress(address: Address): Observable<Address> {
    let addressPayload = {
      "name": address.name,
      "country": address.country,
      "address": address.address,
      "address2": address.address2,
      "zipCode": address.zipCode,
      "city": address.city
    };
    return this.httpClient.post<Address>(this.url + 'user/addresses', addressPayload);
  }

  loadAddressById(id: number): Observable<Address> {
    return this.httpClient.get<Address>(this.url + 'user/addresses/' + id);
  }

  loadAllAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.url + 'user/addresses');
  }

  updateAddress(address: Address): Observable<any> {
    let addressPayload = {
      ...address
    };
    return this.httpClient.put(this.url + 'user/addresses/' + address.id, addressPayload);
  }

  loadShoppingCart(): Observable<SpecifiedItem[]> {
    return this.httpClient.get<SpecifiedItem[]>(this.url + 'cart/items')
  }

  updateItemList(itemList: SpecifiedItem[]): Observable<SpecifiedItem[]> {
    let itemsPayload = {items: itemList};
    return this.httpClient.put<SpecifiedItem[]>(this.url + 'cart/items', itemsPayload)
  }

  updateShoppingCartItem(item: SpecifiedItem): Observable<SpecifiedItem> {
    let itemPayload = {...item};
    return this.httpClient.put<SpecifiedItem>(this.url + 'cart/items/' + item.id, itemPayload)
  }

  deleteItem(itemId: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'cart/items/' + itemId);
  }

  postCoupon(coupon: string): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.url + 'coupons/' + coupon, {});
  }

  loadWishList(): Observable<SpecifiedItem[]> {
    return this.httpClient.get<SpecifiedItem[]>(this.url + 'wishlist/items')
  }

  // updateWishList(specifiedItems: SpecifiedItem[]): Observable<SpecifiedItem[]> {
  //   let itemsPayload = {items: specifiedItems};
  //   return this.httpClient.put<SpecifiedItem[]>(this.url + 'wishlist/items', itemsPayload)
  // }

  addItemToWishList(item: SpecifiedItem): Observable<any> {
    return this.httpClient.post<any>(this.url + 'wishlist/items', {...item});
  }

  updateWishListItem(item: SpecifiedItem): Observable<SpecifiedItem> {
    let itemPayload = {...item};
    return this.httpClient.put<SpecifiedItem>(this.url + 'wishlist/items/' + item.id, itemPayload)
  }

  deleteWishListItem(itemId: number): Observable<any[]> {
    return this.httpClient.delete<any>(this.url + 'wishlist/items/' + itemId);
  }

  deleteWishList(): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'wishlist/items');
  }

  postContact(contact: Contact): Observable<Contact> {
    let contactPayload = {
      "firstName": contact.firstName,
      "lastName": contact.lastName,
      "mail": contact.mail,
      "message": contact.message
    };
    return this.httpClient.post<Contact>(this.url + 'contact', contactPayload);
  }

  updateUser(userPayload: JsonObject): Observable<any> {
    return this.httpClient.put(this.url + 'user', userPayload, {observe: "response"})
      .pipe(
        tap(resp => {
          if (resp.status == 400) {
            throw new Error('Bad request!')
          } else {
            return resp.body;
          }
        })
      );
  }

  postNewsletter(): Observable<any> {
    return this.httpClient.post<any>(this.url + 'user/newsletter', {});
  }

  loadUser(): Observable<User> {
    return this.httpClient.get<User>(this.url + 'user/information');
  }

}
