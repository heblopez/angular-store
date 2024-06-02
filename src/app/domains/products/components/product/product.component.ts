import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'app/domains/shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter<string>();

  addToCartHandler() {
    console.log('click from child ' + this.product.title);
    this.addToCart.emit('Hi! This is a test message from child');
  }
}
