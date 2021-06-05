<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body m-3">
          <label class="form-label">Title</label>
          <input type="text" class="form-control" v-model="title"/>
        </div> 
      </div>  
    </div>  
    <div class="col-lg m-3">
      <Markdoc v-model="doc"/>
    </div>  
    <div class="col-lg-12 m-3">
      <button class="btn btn-primary btn-block" @click="save()">Save</button>
    </div>  
  </div>
</template>

<script>
import Markdoc from "@/components/Markdoc.vue";

export default {
  name: 'EditDocument',
  components: {
    Markdoc
  },
  beforeMount() {
    console.log("Edit doc")
  },
  data() {
    return {
      doc: "# Default",
      title: "Some title",
      url: "http://localhost:3000/api/v1/notes"
    }
  },
  methods: {
    save(){
      console.log("Saved");
      const postData = { 
        title:this.title,
        text:this.doc
      };
      fetch(this.url,{
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-type":"application/json"
        }
      }).then(r => r.json()).then(r => {
        console.log(r);
      }).catch(error => {
        console.error(error);
      });
    }
  },
}
</script>
