import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      sentences: [
        "Front-end developer.",
        "Im creative.",
        "I hate design.",
        "gab is the best.",
      ],
      currentText: "",
      currentIndex: 0,
      charIndex: 0,
      typingSpeed: 100,
      delayBetweenSentences: 2000,
      typingInterval: null,
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    startTypingAnimation() {
      this.typingInterval = setInterval(this.typeCharacter, this.typingSpeed);
    },
    typeCharacter() {
      const currentSentence = this.sentences[this.currentIndex];

      //char index is always at 0 so currenttext is = to sentence[0(0 is the first letter in the sentence so charindex)] and then charindex++ mean plus 1 t'ill theres none
      if (this.charIndex < currentSentence.length) {
        this.currentText += currentSentence[this.charIndex];
        this.charIndex++;
      } else {
        clearInterval(this.typingInterval);
        setTimeout(this.prepareNextSentence, this.delayBetweenSentences);
      }
    },
    prepareNextSentence() {
      this.charIndex = 0;
      this.currentText = "";
      this.currentIndex = (this.currentIndex + 1) % this.sentences.length;
      this.startTypingAnimation();
    },

    beforeDestroy() {
      clearInterval(this.typingInterval);
    },
  },

  mounted() {
    this.startTypingAnimation();
  },
}).mount("#app2");
