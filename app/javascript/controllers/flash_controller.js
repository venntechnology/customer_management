import { Controller } from "@hotwired/stimulus"

// Fade out flash messages after a delay
export default class extends Controller {
  connect() {
    if (this.element) {
      setTimeout(() => {
        this.element.classList.remove('show');
        setTimeout(() => {
          this.element.remove();
        }, 500);
      }, 5000);
    }
  }
}
