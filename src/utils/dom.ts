const DANGEROUS_PROPERTIES = ['innerHTML', 'outerHTML', 'srcdoc', 'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'onkeydown', 'onkeyup', 'onkeypress'];

/**
 * 创建元素工具函数
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {Array|string} classNames  - list or name of CSS class
 * @param  {object} attributes        - any attributes
 * @returns {Element}
 */
export function make(tagName: keyof HTMLElementTagNameMap, classNames?: string | null | string[], attributes: Record<string, string> = {}) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames as []);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    if (DANGEROUS_PROPERTIES.includes(attrName.toLowerCase())) {
      console.warn(`[dom.make] Property "${attrName}" is not allowed for security reasons`);
      continue;
    }
    
    if (attrName === 'textContent') {
      el.textContent = attributes[attrName];
    } else {
      el.setAttribute(attrName, attributes[attrName]);
    }
  }

  return el;
};

export function makeModal(contentId?: string, visible = false, onOk?: () => void) {
  const wrap = make('div', 'cx-common-modal');
  const cancelBtn = make('span', 'cx-commom-modal-cancel', {textContent: '取消'});
  const saveBtn = make('span', 'cx-commom-modal-save', {textContent: '保存'});
  const content = make('div', 'cx-commom-modal-content', {id: contentId});
  wrap.append(content, saveBtn, cancelBtn);

  wrap.style.display = visible ? 'block' : 'none';

  saveBtn.addEventListener('click', () => {
    onOk && onOk();
    wrap.style.display = 'none';
  }, false);

  cancelBtn.addEventListener('click', () => {
    wrap.style.display = 'none';
  }, false);

  return wrap
}

export const hideElementById = (id: string) => {
  const block = document.querySelector(`#${id}`) as HTMLElement;
  if (block) {
    block.style.display = 'none';
  }
}

export function makeFragment(htmlString: string, isTrustedHTML = false) {
  const tempDiv = document.createElement('div');
  
  if (isTrustedHTML) {
    tempDiv.innerHTML = htmlString.trim();
  } else {
    tempDiv.textContent = htmlString;
  }

  const fragment = document.createDocumentFragment();

  fragment.append(...Array.from(tempDiv.childNodes));

  return fragment;
}

export function findElement(target: Element, searchNodeClass: string[]) {
  return searchNodeClass.some(name => !!target.querySelector(`.${name}`))
}