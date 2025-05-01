export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            return navigateTo('../admin/login')
        }
    }
})