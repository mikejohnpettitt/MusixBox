// ============================================
// IMPORT DU FRAMEWORK STIMULUS
// ============================================
import { Controller } from "@hotwired/stimulus"

// ============================================
// CRÉATION DE LA CLASSE
// ============================================
export default class extends Controller {

  // ============================================
  // DÉFINITION DES "TARGETS"
  // ============================================
  static targets = ["video", "canvas", "preview", "cardWrapper", "cardPhoto"]

  // ============================================
  // PROPRIÉTÉS DE LA CLASSE
  // ============================================
  stream = null
  photoData = null
  currentFacingMode = "user"  // "user" = frontale, "environment" = arrière

  // ============================================
  // MÉTHODE STIMULUS : CONNEXION
  // ============================================
  connect() {
    this.autoStartCamera()
    
    // Écouter les changements d'orientation
    this.handleOrientationChange = this.handleOrientationChange.bind(this)
    window.addEventListener("orientationchange", this.handleOrientationChange)
    screen.orientation?.addEventListener("change", this.handleOrientationChange)
  }

  // ============================================
  // MÉTHODE : GÉRER LE CHANGEMENT D'ORIENTATION
  // ============================================
  handleOrientationChange() {
    console.log("Orientation changée:", screen.orientation?.angle || window.orientation)
    
    // Redémarrer la caméra avec la nouvelle orientation
    if (this.stream && this.videoTarget.style.display !== "none") {
      this.stopStream()
      this.autoStartCamera()
    }
  }

  // ============================================
  // MÉTHODE : DÉMARRAGE AUTOMATIQUE DE LA CAMÉRA
  // ============================================
  async autoStartCamera() {
    try {
      // Contraintes vidéo améliorées pour mobile
      const constraints = {
        video: {
          facingMode: this.currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      }
      
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.videoTarget.srcObject = this.stream
      this.videoTarget.style.display = "block"
      
      // Appliquer l'effet miroir pour la caméra frontale
      if (this.currentFacingMode === "user") {
        this.videoTarget.style.transform = "scaleX(-1)"
      } else {
        this.videoTarget.style.transform = "scaleX(1)"
      }
      
      this.showButton("capturePhoto")
      this.showButton("retakePhoto")
      
      console.log("Caméra démarrée automatiquement !")
      
    } catch (error) {
      console.error("Erreur caméra:", error.name, error.message)
      window.location.href = this.element.dataset.resultsUrl
    }
  }

  // ============================================
  // MÉTHODE : CHANGER DE CAMÉRA (frontale/arrière)
  // ============================================
  switchCamera(event) {
    event.preventDefault()
    
    // Alterner entre frontale et arrière
    this.currentFacingMode = this.currentFacingMode === "user" ? "environment" : "user"
    
    // Redémarrer avec la nouvelle caméra
    this.stopStream()
    this.autoStartCamera()
    
    console.log("Caméra changée vers:", this.currentFacingMode)
  }

  // ============================================
  // MÉTHODE : PRENDRE UNE PHOTO
  // ============================================
  capturePhoto(event) {
    event.preventDefault()
    
    const context = this.canvasTarget.getContext("2d")
    
    this.canvasTarget.width = this.videoTarget.videoWidth
    this.canvasTarget.height = this.videoTarget.videoHeight
    
    // Si caméra frontale, on applique l'effet miroir sur le canvas aussi
    if (this.currentFacingMode === "user") {
      context.translate(this.canvasTarget.width, 0)
      context.scale(-1, 1)
    }
    
    context.drawImage(this.videoTarget, 0, 0)
    
    // Réinitialiser le contexte si on a fait un miroir
    if (this.currentFacingMode === "user") {
      context.setTransform(1, 0, 0, 1, 0, 0)
    }
    
    const photoData = this.canvasTarget.toDataURL("image/jpeg")
    
    this.previewTarget.style.display = "none"
    this.videoTarget.style.display = "none"
    
    this.stopStream()
    this.hideButton("capturePhoto")
    
    // Afficher l'aperçu
    this.previewTarget.src = photoData
    this.previewTarget.style.display = "block"
    // Pas d'effet miroir sur la preview (la photo est déjà inversée)
    this.previewTarget.style.transform = "scaleX(1)"
    
    this.showButton("goToCard")
    
    this.photoData = photoData

    // Sauvegarder dans localStorage
    localStorage.setItem("userSelfie", photoData)
    console.log("Photo sauvegardée dans localStorage !")
    
    console.log("Photo prise !")
    this.showButton("goToCard")
  }

  // ============================================
  // MÉTHODE : REPRENDRE UNE PHOTO
  // ============================================
  retakePhoto(event) {
    event.preventDefault()
    
    this.videoTarget.style.display = "block"
    this.previewTarget.style.display = "none"
    this.cardWrapperTarget.style.display = "none"
    
    this.showButton("capturePhoto")
    
    // Redémarrer la caméra avec les bonnes contraintes
    this.autoStartCamera()
    
    console.log("Recommencer !")
  }

  // ============================================
  // MÉTHODE UTILITAIRE : CACHER UN BOUTON
  // ============================================
  hideButton(action) {
    const button = this.element.querySelector(`[data-action="click->camera#${action}"]`)
    if (button) button.style.display = "none"
  }

  // ============================================
  // MÉTHODE UTILITAIRE : AFFICHER UN BOUTON
  // ============================================
  showButton(action) {
    const button = this.element.querySelector(`[data-action="click->camera#${action}"]`)
    if (button) button.style.display = "block"
  }

  // ============================================
  // MÉTHODE UTILITAIRE : ARRÊTER LA CAMÉRA
  // ============================================
  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop()
      })
    }
  }

  // ============================================
  // MÉTHODE STIMULUS : NETTOYAGE
  // ============================================
  disconnect() {
    this.stopStream()
    
    // Retirer les écouteurs d'orientation
    window.removeEventListener("orientationchange", this.handleOrientationChange)
    screen.orientation?.removeEventListener("change", this.handleOrientationChange)
  }

  // ============================================
  // MÉTHODE : TÉLÉCHARGER LA PHOTO
  // ============================================
  downloadPhoto(event) {
    event.preventDefault()
    
    if (!this.photoData) {
      alert("Pas de photo à télécharger")
      return
    }
    
    const link = document.createElement("a")
    link.href = this.photoData
    link.download = `photo_${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ============================================
  // MÉTHODE : ALLER VOIR LA CARD
  // ============================================
  goToCard(event) {
    event.preventDefault()
    
    if (!this.photoData) {
      alert("Pas de photo à afficher")
      return
    }
    
    window.location.href = this.element.dataset.cardUrl
    
    console.log("Redirection vers la card !")
  }

  // ============================================
  // MÉTHODE : PARTAGER SUR INSTAGRAM
  // ============================================
  shareToInstagram(event) {
    event.preventDefault()
    
    if (!this.photoData) {
      alert("Pas de photo à partager")
      return
    }
    
    const blob = this.dataURItoBlob(this.photoData)
    const file = new File([blob], `photo_${Date.now()}.jpg`, { type: "image/jpeg" })
    
    if (navigator.share) {
      navigator.share({
        files: [file],
        title: "Ma photo",
        text: "Regarde ma photo prise avec Musixbox !"
      })
        .then(() => console.log("Photo partagée !"))
        .catch(err => console.error("Erreur de partage:", err))
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur. Utilise 'Save to phone' d'abord.")
    }
  }

  // ============================================
  // MÉTHODE UTILITAIRE : CONVERTIR BASE64 EN BLOB
  // ============================================
  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    
    return new Blob([ab], { type: 'image/jpeg' })
  }
}
