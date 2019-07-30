<template>
  <div class="home-wrap">
    <div class="home-top">
      <Dropdown>
        <Button type="text" size="small" ghost>
          文件
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem><div @click="toCreat(0)"><Icon type="md-document" size="15" /> 新建</div></DropdownItem>
          <DropdownItem>
            <label for="hOpen"><Icon type="ios-folder-open" size="15"/> 打开</label>
            <input ref="refhOpen" type="file" id="hOpen" @change="toChoose" />
          </DropdownItem>
          <!-- <DropdownItem divided><Icon type="md-archive" size="15" /> 保存</DropdownItem>
          <DropdownItem><Icon type="md-albums" size="15" /> 另存为</DropdownItem> -->
          <DropdownItem divided><div @click="closeAll">关闭所有</div></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <tagBox></tagBox>
      <Icon @click="toCreat(0)" class="ico-add" type="md-add" size="20"/>
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
    closeAll () {
      this.$store.commit('removeAll')
      this.$router.push({
        name: 'content',
        params: {
          index: 0
        }
      })
    },
    toCreat (file) {
      this.$store.commit('addFlie', file)
      this.$router.push({
        name: 'content',
        params: {
          index: this.$store.getters.len
        }
      })
    },
    toChoose (e) {
      const file = e.target.files[0]
      this.getContent(file)
      this.$refs.refhOpen.value = null
    },
    getContent (data) {
      if (data.name && (data.name.substring(data.name.length - 3) === '.md' || data.name.substring(data.name.length - 3) === '.MD')) {
        // eslint-disable-next-line
        var n = new FileReader
        n.readAsText(data, {
          encoding: 'utf-8'
        })
        n.onload = () => {
          data.content = n.result
          this.toCreat(data)
        }
      } else {
        alert('文件不正确，请选择md文件')
      }
    }
  },
  mounted () {
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
    background: #2d1c44;
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
#hOpen{
  display: none!important;
}
</style>

