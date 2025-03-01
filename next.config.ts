import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: "dark-plus",
        light: "min-light",
      },
    },
  },
});

export default withNextra({
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
});