import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  cart = this.cartService.cart;

  ngOnInit() {
    this.productService.getProduct().subscribe({
      next: (product) => {
        this.products.set(product);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
