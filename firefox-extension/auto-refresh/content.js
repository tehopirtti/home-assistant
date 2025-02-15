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

                    if (["Päivitä", "Update"].includes(ha_button.getAttribute("aria-label"))) {

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
