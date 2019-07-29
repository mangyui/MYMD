<template>
  <div ref="select_frame" class="content-warp">
    <div class="content-none" v-if="isNone">
      <div @click="toCreat(0)">
        <Icon type="md-document" size="30"/>
        新建
      </div>
      <div>
        <Icon type="ios-folder-open" size="30"/>
        打开
      </div>
    </div>
    <MarkDown v-if="!isNone" style="height: 100%" 
      :initialValue="content" 
      theme="OneDark" 
      :toolbars="config" 
      :autoSave="true"
      :exportFileName="fileName"
      @on-save="onEditorChange"/>
  </div>
</template>

<script>
import MarkDown from 'vue-meditor'
import fs from 'fs'

export default {
  name: 'home',
  components: {
    MarkDown
  },
  data () {
    return {
      content: '',
      fileName: '未命名',
      isNone: true,
      config: {
        fullscreen: false // 隐藏掉打印功能
      }
    }
  },
  methods: {
    onEditorChange (event) {
      // console.log(event)
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
    initContent (file) {
      fs.readFile(file.path, 'utf-8', (err, data) => {
        // 读取文件失败/错误
        if (err) {
          throw err
        } else {
          // 读取文件成功
          this.content = data
          this.fileName = file.name.substring(0, file.name.length - 3)
        }
      })
    }
  },
  created () {
    let files = this.$store.getters.fileList
    let index = this.$route.params.index
    for (let j = 0, len = files.length; j < len; j++) {
      /* eslint-disable */
      if (files[j].index == index) {
        this.isNone = false
        if (files[j].file != 0) {
          this.initContent(files[j])
        }
        break
      }
    }
  },
  mounted () {
    // 阻止离开时的浏览器默认行为
    this.$refs.select_frame.ondragleave = (e) => {
      e.preventDefault()
    }
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault()
      if (e.dataTransfer.files[0]) {
        const data = e.dataTransfer.files[0]
        // console.log(data)
        if (data.name && (data.name.substring(data.name.length-3) === ".md" || data.name.substring(data.name.length-3) === ".MD")) {
          this.toCreat(data)
          // console.log(this.$store.getters.fileList)
        } else {
          alert('文件不正确，请选择md文件')
        }
      }
    }
    this.$refs.select_frame.ondragenter = (e) => {
      e.preventDefault()
    }
    this.$refs.select_frame.ondragover = (e) => {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-warp{
  height: 100%;
  position: fixed;
  width: 100%;
  .content-none{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #41228e!important;
    background-image: url('/static/img/leaf-bg.png');
    div{
      padding: 35px;
      font-size: 20px;
      font-weight: bold;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 3px 5px rgba(0,0,0,0.18);
      display: flex;
      align-items: baseline;
      margin-bottom: 100px;
      cursor: pointer;
      transition: 0.3s;
      &:hover{
        margin-bottom: 120px;
      }
      i{
        margin-right: 12px;
      }
    }
  }
}
</style>
