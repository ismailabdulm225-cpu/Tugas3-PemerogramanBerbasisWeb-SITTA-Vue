window.app.component('status-badge', {

    props: ['status', 'catatan'],

    computed: {
        badgeClass() {
            const s = this.status?.toLowerCase()
            // STATUS STOCK
            if (s === 'aman')
                return 'status-aman'
            if (s === 'menipis')
                return 'status-menipis'
            if (s === 'kosong')
                return 'status-kosong'

            // STATUS TRACKING
            if (s === 'diproses')
                return 'status-proses'
            if (s === 'dalam perjalanan')
                return 'status-perjalanan'
            if (s === 'diterima')
                return 'status-diterima'
            return 'status-default'
        }
    },

    template: `
        <div class="status-wrapper">
            <span :class="['status', badgeClass]">
                {{ status }}
            </span>

            <div
                v-if="catatan"
                class="status-tooltip"
                v-html="catatan">
            </div>
        </div>
    `
})