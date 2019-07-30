<template>
  <div class="tag-warp">
    <div class="tag-box">
      <Tag type="dot" 
        checkable
        @on-change="toChange(item.index)"
        v-for="(item,index) in fileList"
        :key="index"
        :name="item.index" 
        :color="$route.params.index==item.index?'primary':'default'" 
        closable 
        @on-close="toClose(item.index, index)"
        >{{item.file==0?'新建':item.name}}</Tag>
      </div>
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
      this.$router.push({
        name: 'content',
        params: {
          index: index
        }
      })
    },
    toClose (rindex, aindex) {
      this.$store.commit('removeFile', aindex)
      let ii = 0
      if (this.$store.getters.fileList.length > 0) {
        ii = this.$store.getters.fileList[this.$store.getters.fileList.length - 1].index
      }
      // eslint-disable-next-line
      if (rindex == this.$route.params.index) {
        this.$router.push({
          name: 'content',
          params: {
            index: ii
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-warp{
  display: flex;
  margin-left: 5px;
  z-index: 999;
  overflow-y: hidden;
  overflow-x: auto;
  .tag-box{
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 36px;
    z-index: 999;
  }
}
</style>
