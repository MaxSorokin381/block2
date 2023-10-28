<template>
    <div _id="app">
        {{ studentsCount }}
        <input type="text" name="search" v-model="search"><br>
        <table class="table table-dark">
            <tr v-for="item in students" v-bind:key="item._id">
                <td>{{ item.name }}</td>
                <td><input type="checkbox" v-model="item.zdav"></td>
                <td>{{ item.group }}</td>
                <td><a href="#" @click="deleteStudent(item._id)">Видалити</a></td>
            </tr>
        </table>

        <input v-model="student.name">
        <input type="checkbox" v-model="student.zdav">
        <select v-model="student.group">
            <option value="RPZ 19 1/9">RPZ 19 1/9</option>
            <option value="RPZ 19 2/9">RPZ 19 2/9</option>
        </select>
        <button @click="addStudent()">Add student</button>
        
        
        
      

    </div>
    <router-link
        v-for="item in students"
        :key="item._id"
        :to="'/student-info/' + item._id"
      >
        {{ item.name }}
      </router-link>
      <!-- <router-link v-bind:to="'/student-info/'+item._id">{{item.name}}</router-link> -->
</template>




<script>
import axios from 'axios'
import { computed } from 'vue'


export default {

    props: {
           id: '',
       },


    data() {
        return {
            students: [],
            search: '',
            student: { "pib": "", zdav: false, group: "" }
        }
    },
    mounted: function () {
        axios.get('http://34.82.81.113:3000/students').then((response) => {
            console.log(response.data);
            this.students = response.data;
            this.$store.commit('setCount', this.students.length);

        });
    },

    computed: {
    studentsCount() {
        return this.$store.getters.getCount
    }
     },


    methods: {
        addStudent() {
            axios
                .post('http://34.82.81.113:3000/students', this.student)
                .then((response) => {
                    console.log(response.data);
                    this.students.push(response.data);
                    this.student = { pib: '', zdav: false, group: '' };

                });
        },
        deleteStudent(studentId) {
            console.log('studentId:', studentId);
            axios
                .delete(`http://34.82.81.113:3000/students/${studentId}`)
                .then(() => {
                    console.log('Студента видалено');
                    this.students = this.students.filter((student) => student._id !== studentId);
                })
        }
    },

    

}
</script>