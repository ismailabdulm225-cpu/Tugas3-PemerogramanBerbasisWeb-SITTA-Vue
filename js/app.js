const app = Vue.createApp({

    data() {
        return {
            isLoggedIn: localStorage.getItem('login') === 'true',
            userName: localStorage.getItem('userName') || '',
            activeModal: '',
            currentView: 'menu',   // (dashboard control)
            bahanAjar: {
                stokBuku: [],
                tracking: []
            },
            kategoriList: [],
            upbjjList: [],
            modal: {
                show: false,
                type: "",
                message: "",
                payload: null
            }
        }
    },

    methods: {
        handleLoginSuccess(nama) {
            this.isLoggedIn = true
            this.userName = nama
            localStorage.setItem('login', 'true')
            localStorage.setItem('userName', nama)
        },

        handleLogout() {
            this.isLoggedIn = false
            this.userName = ''
            localStorage.removeItem('login')
            localStorage.removeItem('userName')
        },

        openModal(type, message = "", payload = null) {
            this.modal = {
                show: true,
                type,
                message,
                payload
            }
        },

        closeModal() {
            this.modal.show = false
        },

        handleModalConfirm() {
            if (this.modal.type === 'confirm') {
        
                this.bahanAjar.stokBuku.splice(
                    this.modal.payload,
                    1
                )
        
                this.modal.show = false
        
                this.$nextTick(() => {
                    this.modal = {
                        show: true,
                        type: "success",
                        message: "Data berhasil dihapus",
                        payload: null
                    }
                })
            }
        }
    },

    async mounted() {
        const data = await ApiService.getData()
        const d = Array.isArray(data)
            ? data[0]
            : data

        this.bahanAjar = {
            stokBuku: d.stok || [],
            tracking: d.tracking || [],
            paket: d.paket || [],
            pengirimanList: d.pengirimanList || []
        }

        this.kategoriList = d.kategoriList || []
        this.upbjjList = d.upbjjList || []
    }
})

window.app = app
