import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@/app/domains/shared/services/category.service';
import { Category } from '@/app/domains/shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  constructor() {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  sanitizeImagesUrl(products: Product[]) {
    products.map((product) => {
      if (product.images.length > 0 && product.images[0].startsWith('["')) {
        product.images = product.images.map((img) =>
          img.replace(/^\["|"|\]$/g, '')
        );
      }
      return product;
    });
    return products;
  }

  private getProducts() {
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        const products = this.sanitizeImagesUrl(productsData);
        this.products.set(products);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Products loaded: ', this.products()),
    });
  }

  private getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (e) => console.error(e),
      complete: () => console.log('Categories loaded: ', this.categories()),
    });
  }
}
