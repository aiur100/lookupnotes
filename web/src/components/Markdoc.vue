<template>
  <div class="row">

    <div class="col-6">
      <div class="card">
        <div class="card-body" style="height: 500px;">
          <textarea style="width: 100%; height: 100%;" v-model="mark_down" v-on:update="changeMarkDown" />
        </div> 
      </div> 
    </div>  

    <div class="col-6">
      <div class="card">
        <div class="card-body" style="height: 500px;" v-html="parsed">
        </div> 
      </div> 
    </div>  

  </div>   
</template>

<script>
import marked from 'marked';

export default {
  name: 'Markdoc',
  props: {
    modelValue: String // previously was `value: String`
  },
  emits: ['update:modelValue'],
  computed: {
    parsed: function(){
      return marked(this.mark_down);
    }
  },
  beforeMount() {
      this.mark_down = this.modelValue;
  },
  created() {
    this.$watch('mark_down',(newVal) => {
      this.$emit('update:modelValue', newVal)
    })
  },
  data(){
    return {
      mark_down: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
