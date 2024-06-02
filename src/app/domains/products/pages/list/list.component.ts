import { Component, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from 'app/domains/shared/models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);

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
    ];
    this.products.set(initProducts);
  }
  fromChild(event: string) {
    console.log('We are in the parent component:');
    console.log(event);
  }
}
