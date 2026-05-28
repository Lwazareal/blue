// Pure-static bootstrap for the portfolio site.
// Exposes config/images from global variables, without calling /api.

(function () {
  var cfg = window.__PORTFOLIO_CONFIG__ || {};
  var imgs = window.__PORTFOLIO_IMAGES__ || [];

  // Initialize Vue after globals exist.
  if (typeof Vue === 'undefined') {
    // Vue loaded after this script in some cases.
    return;
  }

  Vue.component('image-grid', {

    props: ['images'],
    template: `
      <div class="row">
        <div class="column" v-for="(item, index) in images" :key="index">
          <div class="image-container">
            <img
              v-if="item.type === 'image' || !item.type"
              :src="item.src"
              :alt="item.alt"
            />

            <video
              v-else-if="item.type === 'video'"
              class="portfolio-video"
              :src="item.src"
              :aria-label="item.alt"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
          </div>
        </div>
      </div>
    `
  });


  new Vue({
    el: '#app',
    data: {
      config: cfg,
      images: imgs,
      currentText: '',
      currentYear: new Date().getFullYear()
    },
    mounted: function () {
      document.title = this.config.siteTitle || 'Portfolio';

      var desc = document.querySelector('meta[name="description"]');
      if (desc && this.config.siteDescription) desc.setAttribute('content', this.config.siteDescription);

      var author = document.querySelector('meta[name="author"]');
      if (author && this.config.authorName) author.setAttribute('content', this.config.authorName);

      this.startTextAnimation();
    },
    methods: {
      startTextAnimation: function () {
        if (!this.config.heroTexts || !this.config.heroTexts.length) return;

        var index = 0;
        this.currentText = this.config.heroTexts[0];

        setInterval(() => {
          index = (index + 1) % this.config.heroTexts.length;
          this.currentText = this.config.heroTexts[index];
        }, 3000);
      }
    }
  });
})();

