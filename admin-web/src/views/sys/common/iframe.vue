<template>
  <div class="warp">
    <iframe
      :src="urlPath"
      frameborder="0"
      width="100%"
      allow="geolocation; microphone; camera"
    />
  </div>
</template>
<script>
export default {
  name: 'Myiframe',
  data() {
    return {
      urlPath: '', // iframe 路径
      height: 0
    }
  },
  mounted() {
    // const routerPath = this.$route.params && this.$route.params.routerPath
    const url = this.$route.meta.url
    this.urlPath = url
  }
}
</script>
<style scoped lang="scss">
.warp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // -webkit-overflow-scrolling:touch;
  // overflow: scroll;
  // @media (max-width: 1201px) {
  //   padding-left: 180px;
  // }
  iframe {
    width: 100%;
    height: 100%;

  }
}

</style>
