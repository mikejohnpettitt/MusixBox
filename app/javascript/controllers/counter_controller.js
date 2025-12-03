import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static targets = ["value"]
  connect() { 
     this.count = parseInt(this.valueTarget.textContent)
  }
  increment(){
    this.count += 1
    this.valueTarget.textContent = this.count
  }
  decrement(){
     this.count -= 1
     if (this.count < 0) this.count = 0
      this.valueTarget.textContent = this.count
    
  }
    
  }

