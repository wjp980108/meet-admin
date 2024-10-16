import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import compressPlugin from 'vite-plugin-compression';

type Algorithm = 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
interface Config {
  threshold: number
  filter: (path: string) => boolean
  deleteOriginFile: boolean
  ext?: string
  algorithm?: Algorithm
}

const configCompressPlugin = function (compress: string) {
  if (compress === 'none') {
    return null;
  }

  const config: Config = {
    threshold: 10240,
    filter: (file) => {
      return /\.(?:js|css|html|json|xml|svg|wasm|woff|woff2)$/.test(file); // 只压缩指定的文件类型
    },
    deleteOriginFile: false,
  };

  if (compress === 'brotli') {
    config.ext = '.br';
    config.algorithm = 'brotliCompress';
  }

  return compressPlugin(config);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        dts: 'src/typings/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
        ],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        extensions: ['vue', 'tsx'],
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
      }),
      VueI18nPlugin({
        include: path.resolve(__dirname, './src/locales/**'),
      }),
      configCompressPlugin(env.VITE_COMPRESSION),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      // Configure proxy
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});
