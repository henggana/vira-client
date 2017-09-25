<template>
  <div class="pa3">
    <h1>{{ title }}</h1>

    <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
        <li class="list-group-item" v-for="element in list" :key="element.order">
          <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
          {{element.name}}
          <span class="badge">{{element.order}}</span>
        </li>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
/* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
/* eslint-env es6 */

// INFO: EXAMPLE BASED ON https://github.com/David-Desmaisons/draggable-example/blob/master/src/components/Hello.vue

import { mapState } from 'vuex';
import draggable from 'vuedraggable';

const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs'];

export default {
  name: 'dashboard',
  components: {
    draggable,
  },
  data() {
    return {
      title: 'Dashboard',
      list: message.map((name, index) => {
        return {
          name,
          order: index + 1,
          fixed: false,
        };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost',
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    },
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.replace('/login');
      }
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => one.order - two.order);
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    },
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.isAuthenticated) {
      this.$router.replace('/login');
    }
  },
};
</script>
