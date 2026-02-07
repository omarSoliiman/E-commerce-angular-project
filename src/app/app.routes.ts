import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Home } from './features/products/home/home';
import { Cart } from './features/products/cart/cart';
import { Products } from './shared/components/products/products';
import { ProductDetails } from './features/products/product-details/product-details';
import { Brands } from './features/products/brands/brands';
import { Categories } from './features/products/categories/categories';
import { NotFound } from './layout/not-found/not-found';
import { Logout } from './features/auth/logout/logout';
import { authGuard } from './core/gurd/auth-guard';
import { Order } from './features/products/order/order/order';
import { ForgetPassword } from './features/auth/forget-password/forget-password';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { VerifyResetCode } from './features/auth/verify-reset-code/verify-reset-code';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: Register, title: 'Register' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'order/:cartId', component: Order, title: 'Order', canActivate: [authGuard] },
    { path: 'home', component: Home, title: 'Home', canActivate: [authGuard] },
    { path: 'allorders', component: Home, title: 'Home', canActivate: [authGuard] },
    { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
    { path: 'products', component: Products, title: 'Products', canActivate: [authGuard] },
    { path: 'product-details/:id', component: ProductDetails, title: 'product-details', canActivate: [authGuard] },
    { path: 'brands', component: Brands, title: 'Brands', canActivate: [authGuard] },
    { path: 'categories', component: Categories, title: 'Categories', canActivate: [authGuard] },
    { path: 'forget-password', component: ForgetPassword, title: 'Forget Password' },
    { path: 'reset-password', component: ResetPassword, title: 'Reset Password' },
    { path: 'verify-code', component: VerifyResetCode, title: 'Verify Code' },
    { path: 'logout', component: Logout, title: 'Log Out' },
    { path: '**', component: NotFound, title: 'not-found' },
];
