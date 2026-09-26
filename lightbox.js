(() => {
  const dialog = document.createElement('div');
  dialog.className = 'lightbox';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Image preview');
  dialog.hidden = true;
  dialog.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image preview">&times;</button><img class="lightbox-image" alt="">';
  document.body.appendChild(dialog);

  const preview = dialog.querySelector('.lightbox-image');
  const closeButton = dialog.querySelector('.lightbox-close');
  let previousFocus;

  function close() {
    dialog.hidden = true;
    preview.removeAttribute('src');
    if (previousFocus) previousFocus.focus();
  }

  function open(image, focusTarget) {
    previousFocus = focusTarget || document.activeElement;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || 'Image preview';
    dialog.hidden = false;
    closeButton.focus();
  }

  document.addEventListener('click', event => {
    const image = event.target.closest('img[data-lightbox]');
    if (image) {
      event.preventDefault();
      open(image, image);
      return;
    }

    const imageLink = event.target.closest('a[data-lightbox-src]');
    if (imageLink) {
      event.preventDefault();
      const image = new Image();
      image.src = imageLink.dataset.lightboxSrc;
      image.alt = imageLink.dataset.lightboxAlt || 'Image preview';
      open(image, imageLink);
      return;
    }

    if (event.target === dialog) close();
  });

  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', event => {
    if (!dialog.hidden && event.key === 'Escape') close();
  });
})();
