import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import DemoGrid from './demo-grid.component.js';
import { showFrameworkObservable, getBorder } from 'src/common/colored-border.js';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue-app',
    template: `
      <div id="vue-app">
        <div v-bind:style="{border: border}">
          <div v-if="showFramework">(built with Vue.js)</div>
          <form id="search">
            <div class="row">
              <div class="input-field col s12">
                <div class='input-field'>
                  <input name="query" v-model="searchQuery">
                  <label class="active" for="query">Search</label>
                </div>
              </div>
            </div>
          </form>
          <demo-grid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
          </demo-grid>
        </div>
      </div>
    `,
    components: {
      'demo-grid': DemoGrid,
    },
    data: {
      showFramework: false,
      border: '',
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000, city: 'ho chi minh' },
        { name: 'Jackie Chan', power: 7000, city: 'ho chi minh' },
        { name: 'Jet Li', power: 8000, city: 'ho chi minh' },
        {
          "id": 24667,
          "brandName": "Abacavir/Lamivudine 600/300 Mylan Tablet",
          "shortDrugName": "Abacvr/Lmivdn600/300Mylan",
          "genericName": "Abacavir sulfate;Lamivudine",
          "route": "PO",
          "doNotCrush": 0
        },
        {
          "id": 24847,
          "brandName": "Abacavir/Lamivudine 600/300 Sun Tablet",
          "shortDrugName": "Abacavr/LamvudnSUNTab",
          "genericName": "Abacavir sulfate;Lamivudine",
          "route": "PO",
          "doNotCrush": 0
        },
      ]
    },
    beforeMount: function () {
      this.subscription = showFrameworkObservable.subscribe(showFramework => {
        this.showFramework = showFramework;
        this.border = showFramework ? getBorder('vue') : ``;
      });
    },
    beforeDestroy: function () {
      this.subscription.dispose();
    }
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
