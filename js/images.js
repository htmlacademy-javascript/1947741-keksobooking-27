const FILE_RULES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarForm = document.querySelector('#avatar');
const avatarPreviewForm = document.querySelector('.ad-form-header__preview img');
const photoForm = document.querySelector('#images');
const photoPreviewForm = document.querySelector('.ad-form__photo');

avatarForm.addEventListener('change', () => {
  const file = avatarForm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_RULES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarPreviewForm.src = URL.createObjectURL(file);
  }
});

photoForm.addEventListener('change', () => {
  const file = photoForm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_RULES.some((type) => fileName.endsWith(type));

  if (matches) {
    photoPreviewForm.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.width = '100%';
    photo.style.height = 'auto';
    photoPreviewForm.append(photo);
  }
});

export const resetImages = () => {
  avatarPreviewForm.src = DEFAULT_AVATAR;
  photoPreviewForm.innerHTML = '';
};
