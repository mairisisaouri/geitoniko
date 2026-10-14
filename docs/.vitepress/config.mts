import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// Στο GitHub Actions το BASE_PATH το δίνει το actions/configure-pages:
// "/geitoniko/" για username.github.io/geitoniko, "/" με custom domain (geitoniko.gr).
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  lang: 'el-GR',
  title: 'Γειτονικό',
  titleTemplate: ':title · Γειτονικό',
  description: 'Μην το πετάς, κάποιος γείτονας το χρειάζεται. Αντικείμενα που χαρίζονται σε όλη την Αθήνα, πάνω στον χάρτη.',
  base,
  cleanUrls: true,
  lastUpdated: false,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#15803d' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'el_GR' }],
    ['meta', { property: 'og:title', content: 'Γειτονικό: μην το πετάς, χάρισέ το' }],
    ['meta', { property: 'og:description', content: 'Αντικείμενα που χαρίζονται σε όλη την Αθήνα, πάνω στον χάρτη.' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: 'Χάρτης', link: '/' },
      { text: 'Αφήνω κάτι', link: '/afino' },
      { text: 'Ιστορίες', link: '/istories' },
      { text: 'Πώς λειτουργεί', link: '/pos-leitourgei' },
      { text: 'Newsletter', link: '/newsletter' },
    ],
    footer: {
      message: `Γειτονικό · Αθήνα · <a href="${base}aporrito">Απόρρητο</a>`,
      copyright: 'Χάρτες © συντελεστές OpenStreetMap',
    },
    outline: { label: 'Σε αυτή τη σελίδα' },
    docFooter: { prev: 'Προηγούμενη', next: 'Επόμενη' },
    darkModeSwitchLabel: 'Εμφάνιση',
    lightModeSwitchTitle: 'Φωτεινό θέμα',
    darkModeSwitchTitle: 'Σκούρο θέμα',
    sidebarMenuLabel: 'Μενού',
    returnToTopLabel: 'Επιστροφή επάνω',
    langMenuLabel: 'Γλώσσα',
    notFound: {
      title: 'Η σελίδα δεν βρέθηκε',
      quote: 'Μάλλον την πήρε κάποιος γείτονας. 😉',
      linkText: 'Πίσω στον χάρτη',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
