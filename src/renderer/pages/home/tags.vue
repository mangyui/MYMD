<template>
  <div class="tag-warp">
    <span style="cursor: pointer;" @click="toChange(item.index)" v-for="(item,index) in fileList" :key="index">
      <Tag type="dot" :color="$route.params.index==item.index?'primary':'default'" closable>{{item.file==0?'新建':'文件名'}}</Tag>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['fileList'])
  },
  methods: {
    toChange (index) {
      console.log(index)
      this.$router.push({
        name: 'content',
        params: {
          index: index
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-warp{
  display: flex;
  margin-left: 5px;
  z-index: 3;
}
</style>
