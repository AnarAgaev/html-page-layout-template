const validatePhone = (phone) => {
    let regular = /^(\+7)?(\d{3}?)?[\d]{11}$/;
    return regular.test(phone);
};

const validateEmail = (email) => {
    // Регулярка для email проверяет только наличие @ и точки
    let regular = /.+@.+\..+/i;
    return regular.test(email);
};

// $(document).ready(() => {
//
//     let phoneMask;
//
//     const checkForm = (form) => {
//         const submitBtn = $(form).find('[type="submit"]'),
//             isPhoneValid = validatePhone(phoneMask.unmaskedValue);
//
//         isPhoneValid
//             ? submitBtn.prop({disabled: false})
//             : submitBtn.prop({disabled: true});
//     },
//
//     // ******************** Обработка телефонного номера -- START
//
//     elPhone = document.getElementById('phone'),
//
//     // Маска для телефона
//     phoneMaskOptions = {
//         mask: '+{7} ({9}00) 000-00-00',
//         lazy: true,
//         placeholderChar: '_'
//     },
//
//     initialPhoneMasks = () => {
//         phoneMask = IMask(elPhone, phoneMaskOptions)
//     },
//
//     handlerPhoneFocus = () => {
//         phoneMask.updateOptions({ lazy: false });
//     },
//
//     handlerPhoneBlur = () => {
//         phoneMask.updateOptions({ lazy: true });
//
//         if (!validatePhone(phoneMask.unmaskedValue)) {
//             phoneMask.unmaskedValue = '';
//         }
//     },
//
//     handlerPhoneInput = evt => {
//         const form = $(evt.target).closest('form')[0];
//         checkForm(form);
//     };
//
//     $('[type="tel"]')
//         .each(initialPhoneMasks)
//         .on('focus', handlerPhoneFocus)
//         .on('blur', handlerPhoneBlur)
//         .on('input', handlerPhoneInput);
//
//     // ******************** Обработка телефонного номера -- FINISH
//
//     // ******************** Обработка емэйла -- START
//
//     handlerEmailBlur = evt => {
//         if (!validateEmail(evt.target.value)) {
//             evt.target.value = '';
//         }
//     };
//
//     $('[type="email"]').on('blur', handlerEmailBlur);
//
//     // ******************** Обработка емэйла -- FINISH
// });