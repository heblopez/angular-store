import { Product } from '@/app/domains/shared/models/product.model';
import { ProductService } from '@/app/domains/shared/services/product.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  @Input() id?: string;
  product = signal<Product>({} as Product)

  ngOnInit() {
    if (this.id) {
      this.productService.getOneProduct(this.id).subscribe({
        next: (product) => this.product.set(product),
      });
    }
  }
}
