import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.ailinksall.com"
            },

        ]
    }
};

export default withNextIntl(nextConfig);
