<template>
    <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 33 }"
    :scroll="{ y: true }"
    @change="onChange"
    />
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: "Сurrency",
                    dataIndex: "currency",
                    sorter: (a, b) => a.currency < b.currency ?1 :-1,
                },
                {
                    title: "Rate",
                    dataIndex: "rate",
                    sorter: (a, b) => a.rate < b.rate ?-1 :1,
                },
            ]
        }
    },
    methods: {
    },
    computed:{
        data(){
            return this.$store.getters.soughtRate
        }
    }
}
</script>