async function loadTemplates() {

    const templates = [
        'templates/login-page.html',
        'templates/dashboard-page.html',
        'templates/stock-table.html',
        'templates/do-tracking.html',
        'templates/app-modal.html'
    ]

    const container = document.getElementById('template-container')

    for (const file of templates) {
        const res = await fetch(file)
        const html = await res.text()
        container.innerHTML += html
    }

    window.app.mount('#app')
}

loadTemplates()