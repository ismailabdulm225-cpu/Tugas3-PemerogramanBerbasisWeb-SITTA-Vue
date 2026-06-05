window.app.component('dashboard-page', {

    props: [
        'bahanAjar',
        'kategoriList',
        'upbjjList',
        'userName'
    ],

    template: '#tpl-dashboard-page',

    data() {
        return {
            currentView: 'menu',
            isMenuOpen: false,
            isReportOpen: false,
            showFormModal: false,
            isEdit: false,
            editIndex: -1,
            newItem: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ''
            }
        }
    },

    computed: {
        greeting() {
            const jam = new Date().getHours()
            let sapaan = 'Selamat Malam'
            if (jam < 11) sapaan = 'Selamat Pagi'
            else if (jam < 15) sapaan = 'Selamat Siang'
            else if (jam < 18) sapaan = 'Selamat Sore'
            return `${sapaan}, ${this.userName}`
        }
    },

    methods: {
        logout() {
            this.$emit('logout')
        },

        openForm() {
            this.isEdit = false
            this.showFormModal = true
            this.newItem = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ''
            }
        },
        
        openEdit(item) {
            this.isEdit = true
            this.showFormModal = true
            this.newItem = { ...item }
            this.editIndex = this.bahanAjar.stokBuku.indexOf(item)
        },

        closeForm() {
            this.showFormModal = false
        },

        saveData() {
            // VALIDASI
            if (
                !this.newItem.kode ||
                !this.newItem.judul ||
                !this.newItem.kategori ||
                !this.newItem.upbjj
            ) {
                this.$root.openModal('alert', 'Semua field wajib diisi')
                return
            }
            if (this.newItem.qty < 0) {
                this.$root.openModal('alert', 'Qty tidak valid')
                return
            }
            // EDIT
            if (this.isEdit) {
                this.bahanAjar.stokBuku[this.editIndex] = { ...this.newItem }
                this.$root.openModal('success', 'Data berhasil diupdate')
            }
            // TAMBAH
            else {
                this.bahanAjar.stokBuku.push({ ...this.newItem })
                this.$root.openModal('success', 'Data berhasil ditambahkan')
            }
            this.closeForm()
        },
        hapusStok(item) {
            this.$root.openModal(
                'confirm',
                'Yakin ingin hapus data ini?',
                item
            )
        }

    }

})