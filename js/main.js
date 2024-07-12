class FormSubmit {
    constructor(configuracoes) {
        this.configuracoes = configuracoes;
        this.form = document.querySelector(configuracoes.form);
        this.formButton = document.querySelector(configuracoes.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.configuracoes.success;
    }

    displayError() {
        this.form.innerHTML = this.configuracoes.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        console.log("Submitting form");
        event.preventDefault(); // Prevenir comportamento padrão de envio do formulário
        this.formButton.disabled = true;
        this.formButton.innerText = "Aguarde...";
    }

    async sendForm(event) {
        this.onSubmission(event);
        try {
            console.log("Sending form data");
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            if (response.ok) {
                console.log("Form submitted successfully");
                this.displaySuccess();
            } else {
                console.log("Form submission failed");
                this.displayError();
            }
        } catch (error) {
            console.log("Error during form submission:", error);
            this.displayError();
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener("submit", this.sendForm);
        }
        return false; // Retorna false para prevenir comportamento padrão do navegador
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada com sucesso</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem, TENTE NOVAMENTE</h1>"
});

formSubmit.init();
