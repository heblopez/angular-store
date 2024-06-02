import { Component, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from 'app/domains/shared/models/product.model';
import { HeaderComponent } from 'app/domains/shared/components/header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  cart = signal<Product[]>([]);

  constructor() {
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Product 1',
        price: 700,
        imageUrl: 'https://picsum.photos/640/640?r=24',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 1,
        title: 'Product 2',
        price: 679,
        imageUrl: 'https://picsum.photos/640/640?r=34',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 2,
        title: 'Product 3',
        price: 689,
        imageUrl: 'https://picsum.photos/640/640?r=36',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 3,
        title: 'Product 4',
        price: 699,
        imageUrl: 'https://picsum.photos/640/640?r=39',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 4,
        title: 'Product 5',
        price: 499,
        imageUrl: 'https://picsum.photos/640/640?r=45',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 5,
        title: 'Product 6',
        price: 599,
        imageUrl: 'https://picsum.photos/640/640?r=48',
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 6,
        title: 'Product 7',
        price: 777,
        imageUrl: 'https://picsum.photos/640/640?r=57',
        createdAt: new Date().toISOString(),
      },
    ];
    this.products.set(initProducts);
  }

  addToCart(product: Product) {
    this.cart.update(prev => [...prev, product])
  }
}
