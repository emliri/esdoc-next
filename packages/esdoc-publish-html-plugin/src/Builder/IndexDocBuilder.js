const path = require('path');
const IceCap = require('ice-cap');
const DocBuilder = require('./DocBuilder.js');
const {markdown} = require('./util.js');

/**
 * Index output builder class.
 */
class IndexDocBuilder extends DocBuilder {
  exec(writeFile, copyDir) {
    const ice = this._buildLayoutDoc();
    const title = this._getTitle('Home');
    ice.load('content', this._buildIndexDoc());
    ice.text('title', title, IceCap.MODE_WRITE);
    writeFile('index.html', ice.html);
  }

  /**
   * build index output.
   * @returns {string} html of index output.
   * @private
   */
  _buildIndexDoc() {
    const indexTag = this._tags.find(tag => tag.kind === 'index');
    if (!indexTag) return 'Please create README.md';

    const indexContent = indexTag.content;

    const html = this._readTemplate('index.html');
    const ice = new IceCap(html);
    const ext = path.extname(indexTag.name);
    if (['.md', '.markdown'].includes(ext)) {
      ice.load('index', markdown(indexContent));
    } else {
      ice.load('index', indexContent);
    }

    return ice.html;
  }
}

module.exports = IndexDocBuilder;