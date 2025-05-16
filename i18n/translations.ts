export type TranslationKey = 
  | "common.welcome"
  | "common.search"
  | "common.filter"
  | "common.viewMap"
  | "common.seeAll"
  | "common.featured"
  | "common.nearby"
  | "common.login"
  | "common.register"
  | "common.logout"
  | "common.cancel"
  | "common.save"
  | "common.edit"
  | "common.delete"
  | "common.back"
  | "common.next"
  | "common.done"
  | "common.error"
  | "common.success"
  | "common.loading"
  | "common.noResults"
  | "common.tryAgain"
  | "common.yes"
  | "common.no"
  | "common.confirm"
  | "common.apply"
  | "common.reset"
  | "property.title"
  | "property.description"
  | "property.price"
  | "property.location"
  | "property.bedrooms"
  | "property.bathrooms"
  | "property.area"
  | "property.amenities"
  | "property.contact"
  | "property.call"
  | "property.message"
  | "property.forRent"
  | "property.forSale"
  | "property.addNew"
  | "property.edit"
  | "property.delete"
  | "property.view"
  | "property.type"
  | "property.dealType"
  | "property.specifications"
  | "property.images"
  | "property.addImages"
  | "property.removeImage"
  | "property.selectLocation"
  | "property.submit"
  | "property.apartment"
  | "property.house"
  | "property.villa"
  | "property.office"
  | "property.commercial"
  | "property.land"
  | "auth.signIn"
  | "auth.signUp"
  | "auth.email"
  | "auth.password"
  | "auth.confirmPassword"
  | "auth.forgotPassword"
  | "auth.name"
  | "auth.phone"
  | "auth.termsAndConditions"
  | "auth.alreadyHaveAccount"
  | "auth.dontHaveAccount"
  | "auth.continueAsGuest"
  | "auth.signInToAccess"
  | "profile.myProfile"
  | "profile.myProperties"
  | "profile.myFavorites"
  | "profile.settings"
  | "profile.helpAndSupport"
  | "profile.editProfile"
  | "profile.addProperty"
  | "settings.preferences"
  | "settings.notifications"
  | "settings.darkMode"
  | "settings.language"
  | "settings.support"
  | "settings.privacyPolicy"
  | "settings.termsOfService"
  | "settings.helpCenter"
  | "settings.about"
  | "settings.version"
  | "settings.english"
  | "settings.russian"
  | "settings.uzbek"
  | "chat.messages"
  | "chat.noMessages"
  | "chat.typeMessage"
  | "chat.send"
  | "chat.today"
  | "chat.yesterday"
  | "admin.dashboard"
  | "admin.properties"
  | "admin.users"
  | "admin.messages"
  | "admin.analytics"
  | "admin.moderation"
  | "admin.approve"
  | "admin.reject"
  | "admin.pending"
  | "admin.approved"
  | "admin.rejected"
  | "admin.makeAdmin"
  | "admin.blockUser"
  | "admin.unblockUser"
  | "admin.totalProperties"
  | "admin.totalUsers"
  | "admin.pendingProperties"
  | "admin.recentActivity";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    "common.welcome": "Hello",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.viewMap": "View Properties on Map",
    "common.seeAll": "See All",
    "common.featured": "Featured Properties",
    "common.nearby": "Nearby Properties",
    "common.login": "Login",
    "common.register": "Register",
    "common.logout": "Logout",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.back": "Back",
    "common.next": "Next",
    "common.done": "Done",
    "common.error": "Error",
    "common.success": "Success",
    "common.loading": "Loading",
    "common.noResults": "No results found",
    "common.tryAgain": "Try Again",
    "common.yes": "Yes",
    "common.no": "No",
    "common.confirm": "Confirm",
    "common.apply": "Apply",
    "common.reset": "Reset",
    "property.title": "Title",
    "property.description": "Description",
    "property.price": "Price",
    "property.location": "Location",
    "property.bedrooms": "Bedrooms",
    "property.bathrooms": "Bathrooms",
    "property.area": "Area",
    "property.amenities": "Amenities",
    "property.contact": "Contact",
    "property.call": "Call",
    "property.message": "Message",
    "property.forRent": "For Rent",
    "property.forSale": "For Sale",
    "property.addNew": "Add New Property",
    "property.edit": "Edit Property",
    "property.delete": "Delete Property",
    "property.view": "View Property",
    "property.type": "Property Type",
    "property.dealType": "Deal Type",
    "property.specifications": "Specifications",
    "property.images": "Images",
    "property.addImages": "Add Images",
    "property.removeImage": "Remove Image",
    "property.selectLocation": "Select Location on Map",
    "property.submit": "Submit Property",
    "property.apartment": "Apartment",
    "property.house": "House",
    "property.villa": "Villa",
    "property.office": "Office",
    "property.commercial": "Commercial",
    "property.land": "Land",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot Password?",
    "auth.name": "Name",
    "auth.phone": "Phone",
    "auth.termsAndConditions": "Terms and Conditions",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.continueAsGuest": "Continue as Guest",
    "auth.signInToAccess": "Sign in to access",
    "profile.myProfile": "My Profile",
    "profile.myProperties": "My Properties",
    "profile.myFavorites": "My Favorites",
    "profile.settings": "Settings",
    "profile.helpAndSupport": "Help & Support",
    "profile.editProfile": "Edit Profile",
    "profile.addProperty": "Add Property",
    "settings.preferences": "Preferences",
    "settings.notifications": "Notifications",
    "settings.darkMode": "Dark Mode",
    "settings.language": "Language",
    "settings.support": "Support",
    "settings.privacyPolicy": "Privacy Policy",
    "settings.termsOfService": "Terms of Service",
    "settings.helpCenter": "Help Center",
    "settings.about": "About",
    "settings.version": "Version",
    "settings.english": "English",
    "settings.russian": "Russian",
    "settings.uzbek": "Uzbek",
    "chat.messages": "Messages",
    "chat.noMessages": "No messages yet",
    "chat.typeMessage": "Type a message...",
    "chat.send": "Send",
    "chat.today": "Today",
    "chat.yesterday": "Yesterday",
    "admin.dashboard": "Dashboard",
    "admin.properties": "Properties",
    "admin.users": "Users",
    "admin.messages": "Messages",
    "admin.analytics": "Analytics",
    "admin.moderation": "Moderation",
    "admin.approve": "Approve",
    "admin.reject": "Reject",
    "admin.pending": "Pending",
    "admin.approved": "Approved",
    "admin.rejected": "Rejected",
    "admin.makeAdmin": "Make Admin",
    "admin.blockUser": "Block User",
    "admin.unblockUser": "Unblock User",
    "admin.totalProperties": "Total Properties",
    "admin.totalUsers": "Total Users",
    "admin.pendingProperties": "Pending Properties",
    "admin.recentActivity": "Recent Activity"
  },
  ru: {
    "common.welcome": "Привет",
    "common.search": "Поиск",
    "common.filter": "Фильтр",
    "common.viewMap": "Посмотреть на карте",
    "common.seeAll": "Смотреть все",
    "common.featured": "Рекомендуемые объекты",
    "common.nearby": "Объекты поблизости",
    "common.login": "Вход",
    "common.register": "Регистрация",
    "common.logout": "Выход",
    "common.cancel": "Отмена",
    "common.save": "Сохранить",
    "common.edit": "Редактировать",
    "common.delete": "Удалить",
    "common.back": "Назад",
    "common.next": "Далее",
    "common.done": "Готово",
    "common.error": "Ошибка",
    "common.success": "Успешно",
    "common.loading": "Загрузка",
    "common.noResults": "Ничего не найдено",
    "common.tryAgain": "Попробовать снова",
    "common.yes": "Да",
    "common.no": "Нет",
    "common.confirm": "Подтвердить",
    "common.apply": "Применить",
    "common.reset": "Сбросить",
    "property.title": "Заголовок",
    "property.description": "Описание",
    "property.price": "Цена",
    "property.location": "Местоположение",
    "property.bedrooms": "Спальни",
    "property.bathrooms": "Ванные",
    "property.area": "Площадь",
    "property.amenities": "Удобства",
    "property.contact": "Контакт",
    "property.call": "Позвонить",
    "property.message": "Сообщение",
    "property.forRent": "В аренду",
    "property.forSale": "На продажу",
    "property.addNew": "Добавить объект",
    "property.edit": "Редактировать объект",
    "property.delete": "Удалить объект",
    "property.view": "Просмотр объекта",
    "property.type": "Тип недвижимости",
    "property.dealType": "Тип сделки",
    "property.specifications": "Характеристики",
    "property.images": "Изображения",
    "property.addImages": "Добавить изображения",
    "property.removeImage": "Удалить изображение",
    "property.selectLocation": "Выбрать на карте",
    "property.submit": "Отправить объект",
    "property.apartment": "Квартира",
    "property.house": "Дом",
    "property.villa": "Вилла",
    "property.office": "Офис",
    "property.commercial": "Коммерческая",
    "property.land": "Земля",
    "auth.signIn": "Войти",
    "auth.signUp": "Зарегистрироваться",
    "auth.email": "Email",
    "auth.password": "Пароль",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.forgotPassword": "Забыли пароль?",
    "auth.name": "Имя",
    "auth.phone": "Телефон",
    "auth.termsAndConditions": "Условия использования",
    "auth.alreadyHaveAccount": "Уже есть аккаунт?",
    "auth.dontHaveAccount": "Нет аккаунта?",
    "auth.continueAsGuest": "Продолжить как гость",
    "auth.signInToAccess": "Войдите, чтобы получить доступ",
    "profile.myProfile": "Мой профиль",
    "profile.myProperties": "Мои объекты",
    "profile.myFavorites": "Избранное",
    "profile.settings": "Настройки",
    "profile.helpAndSupport": "Помощь и поддержка",
    "profile.editProfile": "Редактировать профиль",
    "profile.addProperty": "Добавить объект",
    "settings.preferences": "Предпочтения",
    "settings.notifications": "Уведомления",
    "settings.darkMode": "Темная тема",
    "settings.language": "Язык",
    "settings.support": "Поддержка",
    "settings.privacyPolicy": "Политика конфиденциальности",
    "settings.termsOfService": "Условия использования",
    "settings.helpCenter": "Центр помощи",
    "settings.about": "О приложении",
    "settings.version": "Версия",
    "settings.english": "Английский",
    "settings.russian": "Русский",
    "settings.uzbek": "Узбекский",
    "chat.messages": "Сообщения",
    "chat.noMessages": "Нет сообщений",
    "chat.typeMessage": "Введите сообщение...",
    "chat.send": "Отправить",
    "chat.today": "Сегодня",
    "chat.yesterday": "Вчера",
    "admin.dashboard": "Панель управления",
    "admin.properties": "Объекты",
    "admin.users": "Пользователи",
    "admin.messages": "Сообщения",
    "admin.analytics": "Аналитика",
    "admin.moderation": "Модерация",
    "admin.approve": "Одобрить",
    "admin.reject": "Отклонить",
    "admin.pending": "На рассмотрении",
    "admin.approved": "Одобрено",
    "admin.rejected": "Отклонено",
    "admin.makeAdmin": "Сделать администратором",
    "admin.blockUser": "Заблокировать пользователя",
    "admin.unblockUser": "Разблокировать пользователя",
    "admin.totalProperties": "Всего объектов",
    "admin.totalUsers": "Всего пользователей",
    "admin.pendingProperties": "Объекты на модерации",
    "admin.recentActivity": "Последние действия"
  },
  uz: {
    "common.welcome": "Salom",
    "common.search": "Qidirish",
    "common.filter": "Filtr",
    "common.viewMap": "Xaritada ko'rish",
    "common.seeAll": "Hammasini ko'rish",
    "common.featured": "Tavsiya etilgan mulklar",
    "common.nearby": "Yaqin atrofdagi mulklar",
    "common.login": "Kirish",
    "common.register": "Ro'yxatdan o'tish",
    "common.logout": "Chiqish",
    "common.cancel": "Bekor qilish",
    "common.save": "Saqlash",
    "common.edit": "Tahrirlash",
    "common.delete": "O'chirish",
    "common.back": "Orqaga",
    "common.next": "Keyingi",
    "common.done": "Tayyor",
    "common.error": "Xato",
    "common.success": "Muvaffaqiyatli",
    "common.loading": "Yuklanmoqda",
    "common.noResults": "Natija topilmadi",
    "common.tryAgain": "Qayta urinib ko'ring",
    "common.yes": "Ha",
    "common.no": "Yo'q",
    "common.confirm": "Tasdiqlash",
    "common.apply": "Qo'llash",
    "common.reset": "Qayta o'rnatish",
    "property.title": "Sarlavha",
    "property.description": "Tavsif",
    "property.price": "Narx",
    "property.location": "Joylashuv",
    "property.bedrooms": "Yotoqxonalar",
    "property.bathrooms": "Hammomlar",
    "property.area": "Maydon",
    "property.amenities": "Qulayliklar",
    "property.contact": "Aloqa",
    "property.call": "Qo'ng'iroq qilish",
    "property.message": "Xabar",
    "property.forRent": "Ijaraga",
    "property.forSale": "Sotuvga",
    "property.addNew": "Yangi mulk qo'shish",
    "property.edit": "Mulkni tahrirlash",
    "property.delete": "Mulkni o'chirish",
    "property.view": "Mulkni ko'rish",
    "property.type": "Mulk turi",
    "property.dealType": "Bitim turi",
    "property.specifications": "Xususiyatlar",
    "property.images": "Rasmlar",
    "property.addImages": "Rasmlar qo'shish",
    "property.removeImage": "Rasmni o'chirish",
    "property.selectLocation": "Xaritada joyni tanlang",
    "property.submit": "Mulkni yuborish",
    "property.apartment": "Kvartira",
    "property.house": "Uy",
    "property.villa": "Villa",
    "property.office": "Ofis",
    "property.commercial": "Tijorat",
    "property.land": "Yer",
    "auth.signIn": "Kirish",
    "auth.signUp": "Ro'yxatdan o'tish",
    "auth.email": "Email",
    "auth.password": "Parol",
    "auth.confirmPassword": "Parolni tasdiqlang",
    "auth.forgotPassword": "Parolni unutdingizmi?",
    "auth.name": "Ism",
    "auth.phone": "Telefon",
    "auth.termsAndConditions": "Foydalanish shartlari",
    "auth.alreadyHaveAccount": "Akkauntingiz bormi?",
    "auth.dontHaveAccount": "Akkauntingiz yo'qmi?",
    "auth.continueAsGuest": "Mehmon sifatida davom etish",
    "auth.signInToAccess": "Kirish uchun tizimga kiring",
    "profile.myProfile": "Mening profilim",
    "profile.myProperties": "Mening mulklarim",
    "profile.myFavorites": "Sevimlilar",
    "profile.settings": "Sozlamalar",
    "profile.helpAndSupport": "Yordam va qo'llab-quvvatlash",
    "profile.editProfile": "Profilni tahrirlash",
    "profile.addProperty": "Mulk qo'shish",
    "settings.preferences": "Afzalliklar",
    "settings.notifications": "Bildirishnomalar",
    "settings.darkMode": "Qorong'i rejim",
    "settings.language": "Til",
    "settings.support": "Qo'llab-quvvatlash",
    "settings.privacyPolicy": "Maxfiylik siyosati",
    "settings.termsOfService": "Xizmat ko'rsatish shartlari",
    "settings.helpCenter": "Yordam markazi",
    "settings.about": "Dastur haqida",
    "settings.version": "Versiya",
    "settings.english": "Ingliz",
    "settings.russian": "Rus",
    "settings.uzbek": "O'zbek",
    "chat.messages": "Xabarlar",
    "chat.noMessages": "Xabarlar yo'q",
    "chat.typeMessage": "Xabar yozing...",
    "chat.send": "Yuborish",
    "chat.today": "Bugun",
    "chat.yesterday": "Kecha",
    "admin.dashboard": "Boshqaruv paneli",
    "admin.properties": "Mulklar",
    "admin.users": "Foydalanuvchilar",
    "admin.messages": "Xabarlar",
    "admin.analytics": "Tahlillar",
    "admin.moderation": "Moderatsiya",
    "admin.approve": "Tasdiqlash",
    "admin.reject": "Rad etish",
    "admin.pending": "Kutilmoqda",
    "admin.approved": "Tasdiqlangan",
    "admin.rejected": "Rad etilgan",
    "admin.makeAdmin": "Admin qilish",
    "admin.blockUser": "Foydalanuvchini bloklash",
    "admin.unblockUser": "Foydalanuvchini blokdan chiqarish",
    "admin.totalProperties": "Jami mulklar",
    "admin.totalUsers": "Jami foydalanuvchilar",
    "admin.pendingProperties": "Kutilayotgan mulklar",
    "admin.recentActivity": "So'nggi faoliyat"
  }
};