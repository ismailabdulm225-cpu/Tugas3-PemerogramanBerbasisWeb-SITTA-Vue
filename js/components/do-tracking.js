window.app.component("do-tracking", {
    template: "#tpl-tracking",

    data() {
        return {
            search: "",
            progressText: "",
            showAddForm: false,
            showDetailModal: false,
            formData: {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            },
            formErrors: {},
            selectedDetail: null,
            selectedPaket: null
        }
    },

    computed: {
        // FILTER SEARCH (DO / NIM)
        filteredTracking() {
            const list = this.$root.bahanAjar.tracking || []
            if (!this.search) return list
            return list.filter(item =>
                item.noDO?.toLowerCase().includes(this.search.toLowerCase()) ||
                item.nim?.toLowerCase().includes(this.search.toLowerCase()) ||
                item.nama?.toLowerCase().includes(this.search.toLowerCase())
            )
        },

        // LIST MASTER
        paketList() {
            return this.$root.bahanAjar.paket || []
        },

        pengirimanList() {
            return this.$root.bahanAjar.pengirimanList || []
        },
        // AUTO NO DO
        nextDO() {
            const list = this.$root.bahanAjar.tracking || []
            const year = new Date().getFullYear()
            const nums = list
                .map(x => x.noDO)
                .filter(Boolean)
                .map(no => no.match(/DO\d{4}-(\d{3,4})/)?.[1])
                .filter(Boolean)
                .map(Number)
            const next = nums.length ? Math.max(...nums) + 1 : 1
            return `DO${year}-${String(next).padStart(3, "0")}`
        },
        // TOTAL HARGA
        totalHarga() {
            const p = this.paketList.find(
                x => x.kode === this.formData.paket
            )
            return p ? p.harga : 0
        },
        // FORMAT TANGGAL
        formattedTanggal() {
            if (!this.formData.tanggalKirim) return ""
            return new Date(this.formData.tanggalKirim)
                .toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
        }
    },

    watch: {
        "formData.paket"(val) {
            this.selectedPaket =
                this.paketList.find(p => p.kode === val)
        },
        
        showAddForm(val) {
            if (val && !this.formData.tanggalKirim) {
                this.formData.tanggalKirim =
                    new Date().toISOString().split("T")[0]
            }
        }
    },

    methods: {
        // SEARCH ENTER
        searchData() {
        },
        // ESC CLEAR
        clearSearch() {
            this.search = ""
        },

        toggleAddForm() {
            this.showAddForm = !this.showAddForm
        },

        resetForm() {
            this.formData = {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            }
            this.selectedPaket = null
            this.formErrors = {}
        },

        validateForm() {
            this.formErrors = {}
            if (!this.formData.nim)
                this.formErrors.nim = "NIM wajib diisi"
            if (!this.formData.nama)
                this.formErrors.nama = "Nama wajib diisi"
            if (!this.formData.ekspedisi)
                this.formErrors.ekspedisi = "Ekspedisi wajib dipilih"
            if (!this.formData.paket)
                this.formErrors.paket = "Paket wajib dipilih"
            if (!this.formData.tanggalKirim)
                this.formErrors.tanggalKirim = "Tanggal wajib diisi"
            return Object.keys(this.formErrors).length === 0
        },

        // SUBMIT DO
        submitForm() {
            if (!this.validateForm()) return
            const noDO = this.nextDO
            this.$root.bahanAjar.tracking.push({
                noDO,
                nim: this.formData.nim,
                nama: this.formData.nama,
                status: "Diproses",
                ekspedisi: this.formData.ekspedisi,
                paket: this.formData.paket,
                tanggalKirim: this.formattedTanggal, // FORMAT INDONESIA
                total: this.totalHarga,
                perjalanan: [
                    {
                        waktu: new Date().toLocaleString("id-ID"),
                        keterangan: "DO dibuat"
                    }
                ]
            })
            this.resetForm()
            this.showAddForm = false
            this.$root.openModal(
                'success',
                `DO ${noDO} berhasil dibuat`
            )
        },

        // DETAIL
        openDetail(item) {
            this.selectedDetail = item
            this.showDetailModal = true
        },

        closeDetail() {
            this.showDetailModal = false
        },
        // EKSPEDISI
        getEkspedisi(kode) {
            const item = this.pengirimanList.find(p => p.kode === kode)
            return item ? item.nama : "-"
        },

        addProgress() {
            if (!this.progressText) {
                this.$root.openModal(
                    'alert',
                    'Keterangan progress wajib diisi'
                )
                return
            }
            // AUTO UPDATE STATUS
            const text = this.progressText.toLowerCase()
            if (
                text.includes("diterima")
            ) {
                this.selectedDetail.status = "Diterima"
            }
            else if (
                text.includes("perjalanan") ||
                text.includes("dikirim") ||
                text.includes("diteruskan") ||
                text.includes("transit") ||
                text.includes("menuju") ||
                text.includes("berangkat") ||
                text.includes("sampai di")
            ) {
                this.selectedDetail.status = "Dalam Perjalanan"
            }
            else {
                this.selectedDetail.status = "Diproses"
            }

            // TAMBAH TIMELINE
            this.selectedDetail.perjalanan.push({
                waktu: new Date().toLocaleString("id-ID"),
                keterangan: this.progressText
            })
            this.progressText = ""
            this.$root.openModal(
                'success',
                'Progress berhasil ditambahkan'
            )
        }
    }
})