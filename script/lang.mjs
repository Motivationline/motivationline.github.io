const languages = {
    de: { nativeName: "Deutsch" },
    en: { nativeName: "English" },
}

async function initI18n(languages) {
    let resources = {};
    for (let lang in languages) {
        try {
            let resource = await (await fetch(new URL(`../lang/${lang}.json`, import.meta.url))).json();
            resources[lang] = { translation: resource };
        } catch (error) {
            console.error(`Failed to load language "${lang}" due to error`, error);
        }
    }
    i18next.init({
        supportedLngs: ["de", "en"],
        fallbackLng: "de",
        lng: detectLanguage(),
        resources,
    });
    applyLanguageToDOM();
    initButtons();
}

function detectLanguage() {
    const langsToCheck = [];
    //first check if language setting is saved in localstorage
    const langInStorage = localStorage.getItem("lang");
    if (langInStorage) {
        langsToCheck.push(langInStorage);
    }
    // lastly check browser set language
    const langInBrowser = navigator.languages;
    if (langInBrowser && langInBrowser.length > 0) {
        langsToCheck.push(...langInBrowser);
    }
    return returnAnAvailableLanguage(...langsToCheck);

    function returnAnAvailableLanguage(...inputs) {
        for (let lang of inputs) {
            // direct match, e.g. "de" or "en"
            if (lang in languages) return lang;
            // indirect match, e.g. en-US -> en or de-CH -> de
            for (let l in languages) {
                if (lang.startsWith(l)) return l;
            }
        }
        // fallback if all else fails
        return "en";
    }
}

const elementsWithLangData = [];
function applyLanguageToDOM() {
    document.documentElement.lang = i18next.resolvedLanguage;
    if (elementsWithLangData.length > 0) {
        for(let element of elementsWithLangData){
            element.innerHTML = i18next.t(element.dataset.t);
        }
        return;
    }

    let elementsToCheck = [document.documentElement];
    while (elementsToCheck.length > 0) {
        let element = elementsToCheck.pop();
        elementsToCheck.push(...Array.from(element.children));
        if (element.dataset?.t) {
            elementsWithLangData.push(element);
        }
    }
    if (elementsWithLangData.length > 0) applyLanguageToDOM();
}

function initButtons(){
    const buttons = document.getElementsByClassName("lang-switch-button");
    for(let button of buttons){
        button.addEventListener("click", ()=>{switchLanguage(button.dataset.lang); updateButtonsVisually();});
    }
    updateButtonsVisually();
    function updateButtonsVisually(){
        for(let button of buttons){
            button.classList.remove("active");
            if(button.dataset.lang === i18next.resolvedLanguage) 
                button.classList.add("active");
        }
    }
}

initI18n(languages);

export function switchLanguage(lang) {
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
    applyLanguageToDOM();
}