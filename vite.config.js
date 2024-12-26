import Inspect from 'vite-plugin-inspect'
import react from '@vitejs/plugin-react'

export default {
    plugins: [
        // поддержка синтаксиса React (JSX и прочее)
        react(),

        Inspect(),
        // генерация файла `index.d.ts`
        dts({
          insertTypesEntry: true,
        }),
      ],
      build: {
        lib: {
          // путь к основному файлу библиотеки
          entry: path.resolve(__dirname, "src/index.ts"),
          // название библиотеки
          name: "ReactTSLib",
          // форматы генерируемых файлов
          formats: ["es", "umd"],
          // названия генерируемых файлов
          fileName: (format) => `react-ts-lib.${format}.js`,
        }
    },

}