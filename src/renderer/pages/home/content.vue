<template>
  <div ref="select_frame" class="content-warp">
    <div class="content-none" v-if="isNone">
      <div class="none-item" @click="toCreat(0)">
        <Icon type="md-document" size="35"/>
        新建
      </div>
      <label class="none-item" for="fOpen">
        <Icon type="ios-folder-open" size="35"/>
        打开
      </label>
      <input  ref="refOpen" type="file" id="fOpen" @change="toChoose">
    </div>
    <MarkDown ref="markDown" v-if="!isNone" style="height: 100%"
      :initialValue="content" 
      theme="OneDark" 
      :toolbars="config" 
      :autoSave="autoSave"
      :exportFileName="fileName"
      @on-save="onEditorChange"/>
    <div v-if="!isNone">
      <Button size="small" class="my-button-info" @click="showDrawer = true" type="primary" icon="ios-information-circle-outline"></Button>
      <Drawer width="360" :closable="false" v-model="showDrawer">
        <div class="my-file-info">
          <div v-show="!isModification">
            <p class="info-name">文件名：<span>{{fileName}}</span></p>
            <p class="info-path">文件地址：<span>{{fPath}}</span></p>
            <br />
            <div class="my-right">
              <Button size="small" type="text" @click="toUpdate">修改文件名</Button>
            </div>
            <br />
            <br />
            <div class="my-center">
              <Button size="small" type="primary" @click="toSave">保存</Button>
              <Button size="small" @click="toNewSave">另存为</Button>
            </div>
          </div>
          <div v-show="isModification">
            <p class="info-name">文件名：<Input v-model="newName" style="width: auto" @on-enter="updateName" placeholder="请输入文件名"/></p>
            <p class="info-path">&nbsp;</p>
            <br />
            <div class="my-right">
              <Button size="small" type="text" @click="updateName">确认</Button>
              <Button size="small" type="text" @click="isModification = false">取消</Button>
            </div>
            <br />
            <br />
            <br />
          </div>
          <div class="info-tip">
            <h5>提示：</h5>
            <ul>
              <li>在主页和编辑页都可以接收用户鼠标拖动进来的md文件，该操作为新建一个标签</li>
              <li>在编辑页面可选择导入md文件,该操作是将导入的md文件内容覆盖当前的编辑文本</li>
              <li>编辑器在标签切换时会自动保存，用户也可随时手动保存（ctrl + s）</li>
          </ul>
          </div>
        </div>
      </Drawer>
    </div>
  </div>
</template>

<script>
import MarkDown from 'vue-meditor'
import fs from 'fs'
const dialog = require('electron').remote.dialog

export default {
  name: 'pcContent',
  components: {
    MarkDown
  },
  data () {
    return {
      rindex: 0,
      isModification: false,
      showDrawer: false,
      content: '',
      fileName: '未命名',
      newName: '',
      fPath: '',
      isNone: true,
      autoSave: false,
      config: {
        fullscreen: false // 隐藏掉打印功能
      }
    }
  },
  watch: {
    $route (to, from) {
      // eslint-disable-next-line
      if (from.params.index == this.rindex && this.$refs.markDown) {
        this.$refs.markDown.handleSave()
      }
    }
  },
  beforeDestroy () {
    if (this.$refs.markDown) {
      this.$refs.markDown.handleSave()
    }
  },
  methods: {
    toNewSave () {
      var filePath = dialog.showSaveDialog({
        filters: [
          {
            name: 'MD(Markdown)文件',
            extensions: ['md']
          }
        ],
        defaultPath: this.fPath,
        title: '另存为'
      })
      if (filePath && filePath !== '') {
        this.fPath = filePath
        this.$store.commit('updatePath', {index: this.rindex, path: filePath})
        fs.writeFile(this.fPath, this.$refs.markDown.value, {encoding: 'utf8'}, (err) => {
          if (err) {
            console.error(err)
            alert('保存路径错误')
          }
        })
        let pathName = this.fPath.split('\\')
        let hName = pathName[pathName.length - 1]
        if (hName) {
          this.fileName = hName.substring(0, hName.length - 3)
          this.$store.commit('updateName', {index: this.rindex, name: this.fileName})
        }
      }
    },
    toSave () {
      this.$refs.markDown.handleSave()
    },
    toUpdate () {
      this.newName = this.fileName
      this.isModification = true
    },
    fsExistsSync (path) {
      try {
        fs.accessSync(path, fs.F_OK)
      } catch (e) {
        return false
      }
      return true
    },
    updateName () {
      if (this.newName.trim() !== '' || this.newName !== this.fileName) {
        if (this.fPath !== '') {
          let newPath = this.fPath.split(this.fileName + '.md')[0] + this.newName + '.md'
          if (!this.fsExistsSync(newPath)) {
            fs.rename(this.fPath, newPath, (err) => {
              if (err) {
                console.log(err)
                alert('文件名非法')
              } else {
                this.$store.commit('updateName', {index: this.rindex, name: this.newName})
                this.fileName = this.newName
                this.isModification = false
                this.fPath = newPath
                this.$store.commit('updatePath', {index: this.rindex, path: newPath})
              }
            })
          } else {
            alert('文件已存在')
          }
        } else {
          this.$store.commit('updateName', {index: this.rindex, name: this.newName})
          this.fileName = this.newName
          this.isModification = false
        }
      }
    },
    onEditorChange (event) {
      // console.log('cc')
      if (this.fPath !== '') {
        fs.writeFile(this.fPath, event.value, {encoding: 'utf8'}, (err) => {
          if (err) {
            console.error(err)
          }
        })
      } else {
        this.$store.commit('updateContent', {index: this.rindex, content: event.value})
      }
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
      this.$refs.refOpen.value = null
    },
    getContent (data) {
      if (data.name && (data.name.substring(data.name.length - 3) === '.md' || data.name.substring(data.name.length - 3) === '.MD')) {
        // eslint-disable-next-line
        // var n = new FileReader
        // n.readAsText(data, {
        //   encoding: 'utf-8'
        // })
        // n.onload = () => {
        //   data.content = n.result
        this.toCreat(data)
      } else {
        alert('文件不正确，请选择md文件')
      }
    },
    initContent (path) {
      if (path !== '') {
        fs.readFile(path, 'utf-8', (err, data) => {
          // 读取文件失败/错误
          if (err) {
            throw err
          } else {
            // 读取文件成功
            this.content = data
          }
        })
      }
    }
  },
  created () {
    let files = this.$store.getters.fileList
    let index = this.$route.params.index
    this.rindex = index
    for (let j = 0, len = files.length; j < len; j++) {
      // eslint-disable-next-line
      if (files[j].index == index) {
        this.isNone = false
        this.fileName = files[j].name
        this.fPath = files[j].path
        // eslint-disable-next-line
        if (files[j].path == '') {
          this.content = files[j].content
        }
        break
      }
    }
    this.initContent(this.fPath)
  },
  mounted () {
    // 阻止离开时的浏览器默认行为
    this.$refs.select_frame.ondragleave = (e) => {
      e.preventDefault()
    }
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault()
      if (e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0]
        this.getContent(file)
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
  #fOpen{
    display: none!important;
  }
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
    background-image: url('../../../../static/img/leaf-bg.png');
    .none-item{
      display: block;
      padding: 55px;
      font-size: 24px;
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
        margin-right: 20px;
      }
    }
  }
  .my-button-info{
    position: fixed;
    right: 0;
    top: 30%;
    z-index: 9999;
    font-size: 24px;
    width: 50px;
    height: 40px;
    line-height: 30px;
    border-radius: 4px 0 0 4px;
    box-shadow: -3px 0 5px rgba(0,0,0,0.15);
    opacity: 0.85;
    &:hover{
      opacity: 1;
    }
  }
}
</style>
