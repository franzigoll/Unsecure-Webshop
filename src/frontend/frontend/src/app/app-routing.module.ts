import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('../lib/pages/board/board.module').then(m => m.BoardModule),
  },
  {
    path: 'articles/:id',
    loadChildren: () => import('../lib/pages/articleOverview/articleOverview.module').then(m => m.ArticleOverviewModule)
  },

  {path: 'articles', loadChildren: () => import('../lib/pages/ItemList/itemList.module').then(m => m.ItemListModule)},
  {
    path: 'contact',
    loadChildren: () => import('../lib/pages/contactform/contactform.module').then(m => m.ContactformModule)
  },
  {path: 'orders', loadChildren: () => import('../lib/pages/orderList/orderList.module').then(m => m.OrderListModule)},
  {
    path: 'checkout',
    loadChildren: () => import('../lib/pages/orderProcess/orderProcess.module').then(m => m.OrderProcessModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('../lib/pages/shoppingCart/shoppingCart.module').then(m => m.ShoppingCartModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../lib/pages/userSettings/userSettings.module').then(m => m.UserSettingsModule)
  },
  {path: 'wishlist', loadChildren: () => import('../lib/pages/wishList/wishlist.module').then(m => m.WishlistModule)},
  {path: 'login', loadChildren: () => import('../lib/pages/login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('../lib/pages/register/register.module').then(m => m.RegisterModule)},
  {path: 'sustainable', loadChildren: () => import('../lib/pages/sustainable/sustainable.module').then(m => m.SustainableModule)},
  {path: 'impressum', loadChildren: () => import('../lib/pages/impressum/impressum.module').then(m => m.ImpressumModule)},
  {path: 'aboutUs', loadChildren: () => import('../lib/pages/aboutUs/aboutUs.module').then(m => m.AboutUsModule)},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: '**', redirectTo: 'index'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
