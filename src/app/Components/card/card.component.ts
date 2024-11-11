import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product: any;
  cart: any[] = [];
  showProductDetailModal = false;
  showCartModal = false;
  showPaymentMethodModal = false;
  selectedPaymentMethod: string | null = null;
  paymentMethods = ['QR', 'Tarjeta', 'Efectivo'];

  openProductDetailModal() {
    this.showProductDetailModal = true;
  }

  closeProductDetailModal() {
    this.showProductDetailModal = false;
  }

  openCartModal() {
    this.showCartModal = true;
  }

  closeCartModal() {
    this.showCartModal = false;
  }

  addToCart() {
    const existingProduct = this.cart.find(item => item.id === this.product.id);

    if (existingProduct) {
      existingProduct.cantidad += 1;
    } else {
      this.cart.push({ ...this.product, cantidad: 1 });
    }
    this.openCartModal();
    this.closeProductDetailModal();
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);
  }

  updateQuantity(item: any, action: string) {
    if (action === 'increase') {
      item.cantidad++;
    } else if (action === 'decrease' && item.cantidad > 1) {
      item.cantidad--;
    }
    this.getTotal();
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  processPayment() {
    if (this.selectedPaymentMethod) {
      console.log('Método de pago seleccionado:', this.selectedPaymentMethod);
    } else {
      alert('Por favor, seleccione un método de pago.');
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  confirmPaymentMethod() {
    if (this.selectedPaymentMethod) {
      alert("Error en el servidor intente mas tarde")
      this.closePaymentMethodModal();
      this.closeCartModal();
    }
  }


  openPaymentMethodModal() {
    this.showPaymentMethodModal = true;
  }

  closePaymentMethodModal() {
    this.showPaymentMethodModal = false;
  }
}
