connect Navigation.ts with next.config.js by adding redirections
- https://nextjs.org/docs/api-reference/next.config.js/redirects
- https://nextjs.org/docs/api-reference/next.config.js/rewrites

```
async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
```

# Components
##
Use for services compoenets this reveal animation: https://codepen.io/davidleininger/pen/ndWQZZ

##
add context to change some colors on ultra light or dark backgrounds
