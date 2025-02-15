function findLovelace(callback) {

    let intervalId = setInterval(() => {

        let home_assistant = document.querySelector("home-assistant");

        if (home_assistant?.shadowRoot) {

            console.log("Lovelace found");

            clearInterval(intervalId);

            callback(home_assistant.shadowRoot);

        }

    }, 1000);

}

function findUpdateButton(shadowRoot) {

    if (!shadowRoot) {

        console.warn("Lovelace not found");

        return;

    }

    console.log("Searching update button...");

    setTimeout(function() {

        let ha_toast = document.querySelector("home-assistant")?.shadowRoot?.querySelector("notification-manager")?.shadowRoot?.querySelector("ha-toast");

        if (ha_toast?.shadowRoot) {

            console.log("Toast detected");

            setTimeout(function() {

                let ha_button = ha_toast.querySelector("ha-button")?.shadowRoot?.querySelector("button");

                if (ha_button) {

                    console.log("Button detected");

                    if ([
                        "Opdateer", // Afrikaans
                        "تحديث", // العربية
                        "Обновяване", // Български
                        "আপডেট", // বাংলা
                        "Actualitza", // Català
                        "Aktualizovat", // Čeština
                        "Opdater", // Dansk
                        "Aktualisieren", // Deutsch
                        "Aktualisiere", // Schwyzerdütsch
                        "Ανανέωση", // Ελληνικά
                        "Update", // English
                        "Actualizar", // Español
                        "Uuenda", // Eesti
                        "Eguneratu", // Euskara
                        "به‌روز کنید", // فارسی
                        "Päivitä", // Suomi
                        "Mettre à jour", // Français
                        "Actualizar", // Galician
                        "અપડેટ", // ગુજરાતી
                        "עדכון", // עברית
                        "अपडेट", // हिन्दी
                        "Ažuriraj", // Hrvatski
                        "Frissítés", // Magyar
                        "Perbarui", // Bahasa Indonesia
                        "Uppfæra", // Íslenska
                        "Aggiorna", // Italiano
                        "განახლება", // ქართული
                        "ನವೀಕರಿಸಿ", // ಕನ್ನಡ
                        "업데이트", // 한국어
                        "Aktualiséieren", // Lëtzebuergesch
                        "Atnaujinti", // Lietuvių
                        "Atjaunināt", // Latviešu
                        "അപ്ഡേറ്റ്", // മലയാളം
                        "Шинэчлэх", // Монгол хэл
                        "अपडेट", // मराठी
                        "Kemaskini", // Bahasa Melayu
                        "Oppdater", // Norsk Bokmål
                        "अपडेट गर्नुहोस्", // नेपाली
                        "Bijwerken", // Nederlands
                        "Aktualizować", // Polski
                        "Atualizar", // Português
                        "Atualizar", // Português (Brasil)
                        "Actualizare", // Română
                        "Обновить", // Русский
                        "Aktualizovať", // Slovenčina
                        "Posodobi", // Slovenščina
                        "Ажурирај", // Српски
                        "Ažuriraj", // Srpski
                        "Uppdatera", // Svenska
                        "Sasisha", // Kiswahili
                        "అప్‌డేట్", // తెలుగు
                        "อัปเดต", // ภาษาไทย
                        "Güncelle", // Türkçe
                        "Оновити", // Українська
                        "اپ ڈیٹ کریں", // اُردُو
                        "Cập nhật", // Tiếng Việt
                        "更新", // 简体中文
                        "更新", // 繁體中文（香港）
                        "更新" // 繁體中文（台灣）
                      ].includes(ha_button.getAttribute("aria-label"))) {

                        location.reload();

                    }

                }

            }, 1000);

        }

    }, 1000);
    
}

findLovelace((shadowRoot) => {

    console.log("Waiting for updates...");

    findUpdateButton(shadowRoot);

    const observer = new MutationObserver(() => {

        console.log("Update detected");

        findUpdateButton(shadowRoot);

    });

    observer.observe(shadowRoot, { childList: true, subtree: true });

});
