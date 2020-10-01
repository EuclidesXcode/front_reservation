<template>
  <div>
    <line-chart :styles="myStyles"/>
    <button @click="increase()">Increase height</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 300
    }
  },
  methods: {
    increase () {
     this.height += 10
    }
  },
  computed: {
    myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>