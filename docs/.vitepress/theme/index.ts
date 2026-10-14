import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'leaflet/dist/leaflet.css'
import './style.css'

import ItemsMap from './components/ItemsMap.vue'
import ItemForm from './components/ItemForm.vue'
import StoriesFeed from './components/StoriesFeed.vue'
import StoryForm from './components/StoryForm.vue'
import NewsletterForm from './components/NewsletterForm.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ItemsMap', ItemsMap)
    app.component('ItemForm', ItemForm)
    app.component('StoriesFeed', StoriesFeed)
    app.component('StoryForm', StoryForm)
    app.component('NewsletterForm', NewsletterForm)
  },
} satisfies Theme
