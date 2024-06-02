import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hideSideMenu = signal<boolean>(true);
  @Input({ required: true }) cart: Product[] = [];
  total = signal<number>(0);

  toogleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['cart']){
      this.total.set(this.calcTotal())
    }
  }

  calcTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
