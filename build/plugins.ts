import path from 'node:path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import compressPlugin from 'vite-plugin-compression';

type Algorithm = 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
interface Config {
  threshold: number
  filter: (path: string) => boolean
  deleteOriginFile: boolean
  ext?: string
  algorithm?: Algorithm
}

// 压缩插件
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

// 创建 Vite 插件
export default function createVitePlugins(env: any) {
  return [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      dts: 'src/typings/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      extensions: ['vue', 'tsx'],
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, '../src/locales/**'),
    }),
    configCompressPlugin(env.VITE_COMPRESSION),
  ];
}
