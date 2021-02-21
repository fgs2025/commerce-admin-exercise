<template>
  <div class="tab-box">
    <span
      v-for="(item, index) in Tab"
      :key="index"
      :class="[index == cindex ? 'aaa' : '']"
      @click="tabclick(index)"
    >
      {{ item.title }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cindex: 0,
    };
  },
  computed: {
    Tab() {
      return this.$store.getters.getTab;
    },
  },
  methods: {
    tabclick(index) {
      this.cindex = index;
    },
  },
};
</script>

<style lang="less" scoped>
  .tab-box {
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: center;
    span {
      margin-left: 20px;
      cursor: pointer;
    }
    .aaa {
      color: skyblue;
    }
  }
</style>