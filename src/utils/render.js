import AbstractElement from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

// оставила, потому что на лекции говорили, что эта функция еще понадобится, комментирование в конце удалю
// export const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
//   container.insertAdjacentHTML(place, template);
// };

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  if (!container) {
    throw new Error(`No container provided...`);
  }

  if (!child) {
    throw new Error(`No child provided...`);
  }

  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  if (child instanceof AbstractElement) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (newChild instanceof AbstractElement) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof AbstractElement) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (newChild === null || oldChild === null || parent === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};