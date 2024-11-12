//import 'vuetify/lib/styles/main.sass';
//import '../sass/variables.scss';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components/index';
import * as directives from 'vuetify/lib/directives/index';

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#41b883',
          // background: '#35495e',
          // error: '#d63031',
          // info: '#0984e3',
          // secondary: '#fdcb6e',
          // success: '#00cec9',
          // surface: '#6c5ce7',
          // warning: '#2d3436',
        //  yellow: '#c89300',
         // orange: '#ce5c00',
        },
        //dark: false,
        //variables: {},
      },
    },
  },
});