<template>
    <div style="background-color: antiquewhite; height: 100%; ; margin-top: 0px; border-radius: 10px;">  
        <div class="x-sign" v-if="showXSign"> X </div>
        <div class="container">
            <div class="left-div">
                <div class="word-div" style="margin-right: 100px;">
                    <div>
                        {{ this.pageData.positiveTitle[0] }}
                    </div>
                    <div> 
                        {{ this.pageData.positiveTitle[1] }}
                    </div>
                </div>
            </div>
            <div class="right-div">
                <div class="word-div" style="margin-left: 100px;">
                    <div>
                        {{ this.pageData.negativeTitle[0] }}
                    </div>
                    <div> 
                        {{ this.pageData.negativeTitle[1] }}
                    </div>
                </div>
            </div>
            <div class="overlay-div">
                <div class="word-div">
                    {{ testData.testDescription }}
                </div>
            </div>
            <div class="line-div"></div>
        </div>

        <div class="note-div">
            <p>If you make a mistake, a red <span style="color: rgb(194, 15, 15)"> X </span>  will appear. Press the other key to continue.</p>
        </div>
    </div>

    
</template>

<script>
export default {
    name: 'IatComponent',
    props: {
        pageData: {
            type: Array,
        },
        testData:{
            type: Object
        },
        showXSign: {
            type: Boolean
        }
    }
}
</script>

<style scoped>
.container {
position: relative;
height: 100%; 
display: flex;
}

.x-sign {
position: absolute;
top: 85px; 
left: 49%;
font-weight: bold;
font-size: 50px;
color: rgb(194, 15, 15);
}

.left-div,
.right-div {
/* height: 400px; */
flex: 1 0 50%;
display: flex;
justify-content: center;
align-items: center;
}

.line-div {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 6px;
height: 100%;
background-color: #105ea6;
z-index: 1;
}

.overlay-div {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 30%;
height: 100px;
background-color: rgb(238, 219, 196);
border-radius: 10px;
border: 6px solid #105ea6;
z-index: 2;
display: flex;
justify-content: center;
align-items: center;
}

.word-div {
justify-content: center;
font-size: 40px;
color: #105ea6;
font-weight: bold;
word-wrap: break-word;
}

.note-div {
margin-top: 20px;
height: 30px;
background-color: #105ea6;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
font-size: 15px;
color: antiquewhite;
font-weight: bold;
}
</style>
