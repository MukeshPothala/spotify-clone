/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['preview.redd.it',"www.iphonefaq.org","uhrdznuqfgqaffuitvnu.supabase.co"],
    }
}

module.exports = nextConfig
