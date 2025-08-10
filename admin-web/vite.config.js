import vue from '@vitejs/plugin-vue2';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import requireTransform from 'vite-plugin-require-transform';
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import path from 'path'

export default {
  server: {
    host: '0.0.0.0',
    port: 10002,
    // 是否开启 https
    https: false,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.css', '.ts', '.jsx']
  },
  base: '/',
  plugins: [
    vue(),
    vue2Jsx({}),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    requireTransform({
      fileRegex: /.ts$|.tsx$|.vue$/
    })],
}



