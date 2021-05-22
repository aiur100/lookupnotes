<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-6">
        <div class="card">
          <div class="card-body" style="height: 300px;">
            <textarea style="width: 100%; height: 500px;" v-model="mark_down"/>
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
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'Markdoc',
  computed: {
    parsed: function(){
      return marked(this.mark_down);
    }
  },
  data(){
    return {
      mark_down: ""
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
