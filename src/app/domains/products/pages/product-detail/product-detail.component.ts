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
  product = signal<Product | null>(null);
  coverImg = signal<string>('');

  ngOnInit() {
    if (this.id) {
      this.productService.getOneProduct(this.id).subscribe({
        next: (product) => {
          if (product.images.length > 0 && product.images[0].startsWith('["')) {
            this.sanitizeImagesUrl(product);
            this.coverImg.set(product.images[0]);
          }
          this.product.set(product);
        },
        complete: () => console.log('Product loaded: ', this.product()),
      });
    }
  }

  sanitizeImagesUrl(product: Product) {
    product.images = product.images.map((img) =>
      img.replace(/^\["|"|\]$/g, '')
    );
  }

  changeCover(newImage: string) {
    this.coverImg.set(newImage);
  }
}
