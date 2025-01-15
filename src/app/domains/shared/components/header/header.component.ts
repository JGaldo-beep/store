import { Component, Input, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];
  hideSideMenu = signal(true);

  toogleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  getTotalPrice() {
    return this.cart.reduce((acc, product) => acc + product.price, 0);
  }
}
