import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/index.ts',
  moduleName: 'react-web-share-api',
  targets: [{ dest: 'dist/react-web-share-api.min.js', format: 'umd' }],
  plugins: [
    typescript(),
    uglify()
  ],
  exports: 'named',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
