import postcss from "rollup-plugin-postcss";
import discardDuplicates from "postcss-discard-duplicates";

export default [
    {
        input: 'src/nlds/scss/main.scss',
        output: {
        file: 'public/nijmegen-nlds.min.css',
          sourcemap: false,
          format: "esm",
          compact: true,
        },
        plugins: [
          postcss({
            extensions: [".css", ".scss"],
            plugins: [discardDuplicates()],
            extract: true,
            minimize: true,
          }),
        ],
    }
];