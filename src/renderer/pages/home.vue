<template>
  <div class="home-wrap">
    <div class="home-top">
      <Dropdown>
        <Button type="text" size="small">
          文件
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem><Icon type="md-document" size="15" /> 新建</DropdownItem>
          <DropdownItem><div @click="toCreat"><Icon type="ios-folder-open" size="15"/> 打开</div></DropdownItem>
          <DropdownItem divided><Icon type="md-archive" size="15" /> 保存</DropdownItem>
          <DropdownItem><Icon type="md-albums" size="15" /> 另存为</DropdownItem>
          <DropdownItem divided>退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <tagBox></tagBox>
      <Icon @click="toCreat" class="ico-add" type="md-add" size="20"/>
    </div>
    <div class="home-content">
      <keep-alive >
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tagBox from './home/tags'

export default {
  name: 'home',
  components: {
    tagBox
  },
  data () {
    return {

    }
  },
  methods: {
    toCreat () {
      this.$store.commit('addFlie', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap{
  .home-top{
    padding: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    z-index: 99;
    background: #e9e9e9;
    display: flex;
    align-items: center;
    Button{
      margin: 0 2px;
    }
  }
  .home-content{
    margin-top: 36px;
  }
}
.ico-add{
  padding: 0 5px;
  cursor: pointer;
}
</style>

