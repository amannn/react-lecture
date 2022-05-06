module.exports = ({marp}) =>
  marp.use(require('markdown-it-plantuml'), {
    // Wrap for better rendering in some built-in themes
    render: (...args) =>
      `<figure class="uml">${marp.markdown.renderer.rules.image(
        ...args
      )}</figure>`
  });
