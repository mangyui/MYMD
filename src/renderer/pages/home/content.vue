<template>
  <div>
    <MarkDown style="height: 100%" theme="OneDark" :toolbars="config" :autoSave="true" @on-save="onEditorChange"/>
  </div>
</template>

<script>
import MarkDown from 'vue-meditor'

export default {
  name: 'home',
  components: {
    MarkDown
  },
  data () {
    return {
      content: '',
      config: {
        fullscreen: false // 隐藏掉打印功能
      }
    }
  },
  methods: {
    onEditorChange (event) {
      console.log(event)
    }
  }
}
</script>
