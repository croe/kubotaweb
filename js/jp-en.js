<script>
  function wrapHalfFullCustom(className) {
    const elements = document.querySelectorAll('.' + className);

    elements.forEach(el => {
      // 要素が空かどうかチェック（←これ追加）
      if (!el || !el.textContent) return;

      const text = el.textContent;

      const wrapped = Array.from(text).map(char => {
        const code = char.charCodeAt(0);

        if (
          // 半角英数字・半角記号（ASCII 0x21〜0x7E）
          (code >= 0x21 && code <= 0x7E)
        ) {
          return `<span class="en">${char}</span>`;
        } else if (
          // 半角カタカナ（0xFF61〜0xFF9F）または日本語（ひらがな・カタカナ・漢字など）
          (code >= 0xFF61 && code <= 0xFF9F) ||
          (/[\u3040-\u30FF\u4E00-\u9FFF\uFF01-\uFF60]/.test(char))
        ) {
          return `<span class="jp">${char}</span>`;
        } else {
          // スペースやその他（そのまま返す）
          return char;
        }
      }).join('');

      el.innerHTML = wrapped;
    });
  }

  // ページ読み込み後に実行
  document.addEventListener('DOMContentLoaded', () => {
    wrapHalfFullCustom('lang-target');
  });
</script>