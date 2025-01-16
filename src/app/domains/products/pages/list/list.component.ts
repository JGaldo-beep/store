import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@product/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { Category } from '@shared/models/category.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.getProduct();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProduct() {
    this.productService.getProduct(this.category_id).subscribe({
      next: (product) => {
        this.products.set(product);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (category) => {
        this.categories.set(category);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
