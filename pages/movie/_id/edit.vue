<template>
 <movie-form :movie-id="$route.params.id"></movie-form>
</template>

<script>
import MovieForm from "../../../components/MovieForm";
export default {
  name: "edit",
  components: {MovieForm}
}
</script>

<style scoped>

</style>