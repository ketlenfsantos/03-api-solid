// VITEST - FRAMEWORK DE TESTES
import { defineConfig } from 'vitest/config'
//plugin para entender os arquivos (src) paths do ts.config
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
      dir: 'src', // Essa linha
    },
  })