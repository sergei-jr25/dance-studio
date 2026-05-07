import type { NextConfig } from "next"

const nextConfig: NextConfig = {
   typescript: {
    // ⚠️ ВНИМАНИЕ: отключает проверку типов при сборке
    // Используй ТОЛЬКО для срочного деплоя
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
