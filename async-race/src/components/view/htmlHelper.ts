export default class HtmlHelper {
  static createElement(
    tag: string,
    id: string,
    classNames: string[] | null,
    text: string,
    type: string = '',
    value: string = '',
    disabled: boolean = false,
    innerHTML: string = ''
  ): HTMLElement {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (classNames) classNames.forEach((item) => element.classList.add(item));
    if (text) element.textContent = text;
    if (type) element.setAttribute('type', type);
    if (value) element.setAttribute('value', value);
    if (disabled) element.setAttribute('disabled', 'true');
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }
}
