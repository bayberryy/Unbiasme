<template>
    <div style="background-color: antiquewhite; height: 100%;  margin-top: -80px; border-radius: 10px">  

        <div style="padding-top: 5px;">
            <h1>
                {{ this.congruentResult }}
                {{ this.incongruentResult }}
            </h1>
        </div>
    </div>
</template>

<script>
// const iatData = require('@/data/iat-data')

export default {
    name: 'IatResult',
    props: {
        congruentResult: {
            type: Number
        },
        incongruentResult: {
            type: Number
        }
    },
}
</script>

<style scoped>
div {
    margin-top: 80px;
    background-color: antiquewhite;
}

.bold {
    font-weight: bold;
    color: #517395
}

.bold-red {
    font-weight: bold;
    color: rgb(194, 15, 15);
}
</style>
