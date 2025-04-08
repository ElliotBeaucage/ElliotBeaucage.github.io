import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      sentences: ["Développeur front-end.", "Développeur back-end."],
      currentText: "",
      currentIndex: 0,
      charIndex: 0,
      typingSpeed: 70, // Vitesse de frappe (ms par lettre)
      delayBeforeDeleting: 1000, // Pause avant effacement (ms)
      deletingSpeed: 50, // Vitesse d'effacement (ms par lettre)
      isDeleting: false,
    };
  },
  methods: {
    startTypingAnimation() {
      if (!this.isDeleting) {
        this.typeCharacter();
      } else {
        this.deleteCharacter();
      }
    },

    typeCharacter() {
      const currentSentence = this.sentences[this.currentIndex];

      if (this.charIndex < currentSentence.length) {
        this.currentText += currentSentence[this.charIndex];
        this.charIndex++;
        setTimeout(this.startTypingAnimation, this.typingSpeed);
      } else {
        setTimeout(() => {
          this.isDeleting = true;
          this.startTypingAnimation();
        }, this.delayBeforeDeleting);
      }
    },

    deleteCharacter() {
      if (this.charIndex > 0) {
        this.currentText = this.currentText.slice(0, -1);
        this.charIndex--;
        setTimeout(this.startTypingAnimation, this.deletingSpeed);
      } else {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.sentences.length;
        setTimeout(this.startTypingAnimation, this.typingSpeed);
      }
    },
  },

  mounted() {
    this.startTypingAnimation();
  },
}).mount("#app2");
