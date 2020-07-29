<template>
  <div class="history">
	<br><br><br>
	<line-example :width="1500" :height="300"></line-example>
  </div>
</template>

<script>
import LineExample from '@/components/graph.js'
export default {
  name: 'tes',
  components: {
	LineExample
  }
}
</script>