window.app.component('login-page', {

    template: '#tpl-login-page',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        login() {
            if (
                this.email === 'admin@ut.ac.id' &&
                this.password === 'admin123'
            ) {
                const nama = this.email.split('@')[0]
                this.$emit('login-success', nama)
            } else {
                this.$root.openModal(
                    'alert',
                    'Email atau password salah'
                )
            }
        },
        
        openModal(type) {
            this.$root.openModal(type)
        }
    }
})