window.app.component('stock-table', {
    props: ['items', 'upbjjList', 'kategoriList'],

    template: `#tpl-stock-table`,

    data() {
        return {
            filterUpbjj: '',
            filterKategori: '',
            filterLowStock: false,
            filterEmptyStock: false,
            sortBy: ''
        }
    },

    computed: {
        filteredItems() {
            let data = Array.isArray(this.items) ? [...this.items] : []
            if (this.filterUpbjj)
                data = data.filter(i => i.upbjj === this.filterUpbjj)
            if (this.filterKategori)
                data = data.filter(i => i.kategori === this.filterKategori)
            if (this.filterEmptyStock)
                data = data.filter(i => i.qty === 0)
            if (this.filterLowStock)
                data = data.filter(i => i.qty > 0 && i.qty < i.safety)
            if (this.sortBy)
                data.sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
            return data
        }
    },

    watch: {
        filterUpbjj() {
            this.filterKategori = ''
        },
        
        filterKategori(newVal) {
            console.log(
                "Kategori berubah:",
                newVal
            )
        }
    },

    methods: {
        resetFilters() {
            this.filterUpbjj = ''
            this.filterKategori = ''
            this.filterLowStock = false
            this.filterEmptyStock = false
            this.sortBy = ''
        },

        getStatus(i) {
            if (i.qty === 0)
                return 'Kosong'
            if (i.qty < i.safety)
                return 'Menipis'
            return 'Aman'
        }
    }
})