import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["video", "canvas", "preview"]

  async startCamera(event) {
    event.preventDefault()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      this.videoTarget.srcObject = stream
      console.log(" Caméra démarrée !")
    } catch (error) {
      alert("Erreur caméra: " + error.message)
    }
  }

  capturePhoto(event) {
    event.preventDefault()
    
    const context = this.canvasTarget.getContext("2d")
    this.canvasTarget.width = this.videoTarget.videoWidth
    this.canvasTarget.height = this.videoTarget.videoHeight
    context.drawImage(this.videoTarget, 0, 0)
    
    const photoData = this.canvasTarget.toDataURL("image/jpeg")
    
    this.previewTarget.src = photoData
    this.previewTarget.style.display = "block"
    
    this.videoTarget.style.display = "none"
    
    this.element.querySelector('button:nth-of-type(1)').style.display = "none"
    this.element.querySelector('button:nth-of-type(2)').style.display = "none"
    this.element.querySelector('button:nth-of-type(3)').style.display = "inline-block"
    
    console.log(" Photo prise !")
    console.log(photoData)
  }

  retakePhoto(event) {
    event.preventDefault()
    
    this.videoTarget.style.display = "block"
    this.previewTarget.style.display = "none"
    
    this.element.querySelector('button:nth-of-type(2)').style.display = "inline-block"
    this.element.querySelector('button:nth-of-type(3)').style.display = "none"
    
    console.log(" Recommencer !")
  }
}