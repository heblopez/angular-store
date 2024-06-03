import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from 'app/domains/shared/models/product.model';
import { HeaderComponent } from 'app/domains/shared/components/header/header.component';
import { CartService } from 'app/domains/shared/services/cart.service';
import { ProductService } from 'app/domains/shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  constructor() {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        const products = productsData.map((product) => {
          if (product.images.length > 0 && product.images[0].startsWith('["')) {
            product.images = product.images.map((img) => img.replace(/^\["|"|\]$/g, ''));
          }
          return product;
        });
        this.products.set(products);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Products loaded:', this.products()),
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
