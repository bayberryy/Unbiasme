<template>
    <div class="square-container">
        
        <div class="square-border">
            <InstructionElement v-if="showInstruction" :pageData="pageData" />
            <IatComponent  v-if="showIatComponent" :pageData="pageData" :testData="testData" :showXSign="showXSign" />
            <IatResult v-if="showIatResult" :congruentResult="congruentResult" :incongruentResult="incongruentResult" />
        </div>
    </div>
</template>

<script>
    import InstructionElement from '@/components/instruction-component.vue'
    import IatComponent from '@/components/iat-component.vue'
    import IatResult from '@/components/iat-result.vue'
    import IatData from '@/data/iat-data'

    console.log(IatData.length)

    export default {
    name: 'DisplayPage',
    components: {
        InstructionElement,
        IatComponent,
        IatResult
    },
    data() {
        return {
            showInstruction: true,
            showIatComponent: false,
            showIatResult: false,
            showXSign: false,
            dataArray: IatData,
            pageIndex: 0,
            testIndex: 0,
            noOfPages: IatData.length,
            iatTiming: {},
            congruentResult: 0,
            incongruentResult: 0
        }
    },
    computed: {
        pageData() {
            return this.dataArray[this.pageIndex]
        },

        testData() {
            return this.dataArray[this.pageIndex].testCases[this.testIndex]
        },
    },
    mounted() {
        this.mountTestDataListeners()
    },
    watch: {
        testIndex(newValue) {

            if (newValue == 10) {
                this.nextPage()

            }
        }
    },
    methods: { 
        mountTestDataListeners() {

            const startTime = performance.now()

            window.addEventListener('keydown', (event) => {

                if (event.key === ' ') {
                    this.showInstruction = false
                    this.showIatComponent = true
                }

                if (this.showInstruction) {
                    if (event.key === 'e' || event.key === 'i') {
                        event.preventDefault()
                        return
                    }  
                }

                if (event.key === 'e' && this.testIndex <= 9) {
                    if (this.dataArray[this.pageIndex].positiveTitle.includes(this.dataArray[this.pageIndex].testCases[this.testIndex].wordCategory)) {
                        // add calculation timing here
                        const endTime = performance.now()
                        const timing = endTime - startTime
                        if ( ! Object.prototype.hasOwnProperty.call(this.iatTiming, this.pageIndex) ) {
                            this.iatTiming[this.pageIndex] = []
                        }
                        this.iatTiming[this.pageIndex].push(timing)

                        this.testIndex += 1;
                        this.showXSign = false
                    }

                    else {
                        this.showXSign = true
                    }
                }

                if (event.key === 'i' && this.testIndex <= 9) {
                    if (this.dataArray[this.pageIndex].negativeTitle.includes(this.dataArray[this.pageIndex].testCases[this.testIndex].wordCategory)) {
                        
                        const endTime = performance.now()
                        const timing = endTime - startTime
                        if ( ! Object.prototype.hasOwnProperty.call(this.iatTiming, this.pageIndex) ) {
                            this.iatTiming[this.pageIndex] = []
                        }
                        this.iatTiming[this.pageIndex].push(timing)

                        this.testIndex += 1;
                        this.showXSign = false
                    }

                    else {
                        this.showXSign = true
                    }
                }
        });
    },

        nextPage() {
            if ( this.pageIndex < this.noOfPages - 1 ) {
                        this.pageIndex += 1
                        this.testIndex = 0
                        this.showInstruction = true
                        this.showIatComponent = false
                        console.log(this.pageIndex, this.noOfPages -1)
                    }
            if ( this.pageIndex === this.noOfPages - 1 && this.testIndex === 10) {
                    console.log(this.iatTiming)
                    // index 0 => congruent test | index 1 => incongruent test
                    this.congruentResult = this.iatTiming[0].reduce(( total, current ) => total + current, 0) / this.iatTiming[0].length
                    this.incongruentResult = this.iatTiming[1].reduce(( total, current ) => total + current, 0) / this.iatTiming[1].length
                    console.log(typeof this.congruentResult, this.incongruentResult)
                    this.showIatComponent = false
                    this.showIatResult = true

            }
        }
    }
    }
</script>

<style scoped>
.square-container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
}
.square-border {
width: 50%;
height: 60%;
min-width: 800px;
min-height: 400px;
border: 6px solid #105ea6;
border-radius: 10px
}
    
</style>