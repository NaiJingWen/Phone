<template>
    <div class="app-list">
        <h1>用户信息列表</h1>
        <ul>
          <li v-for="item in list">
            {{item.id}}:{{item.name}}:{{item.age}}
          </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[{id:1,name:"dongdong",age:24},
                      {id:2,name:"wenhua",age:21},
                      {id:3,name:"yanyan",age:18}]
            }
        }
    }
</script>
<style> 
</style>