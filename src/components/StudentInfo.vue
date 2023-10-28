<template>
    {{ student.name }}
    {{ student.group }}
    <img :src="student.photo" alt="Student Photo" style="max-width: 200px; height: auto;">
</template>

<script>
import axios from "axios";

export default {
    props: {
        _id: '',
    },
    data() {
        return {
            student: {},
        };
    },
    mounted: function () {
        axios.get("http://34.82.81.113:3000/students/"+this._id).then((response) => {
            console.log(response.data)
            this.student = response.data;
        });
    }
}
</script>

<style scoped>
</style>