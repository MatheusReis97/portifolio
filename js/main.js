class FormSubmit{
    constructor (configuracoes){
        this.configuracoes = configuracoes;
        this.form = document.querySelector(configuracoes.form);
        this.formButton = document.querySelector(configuracoes.button);
        if (this.form){
            this.url = this.form.getAttibute("action");
        }
            this.sendForm = this.sendForm.bind(this);
    }

    displaySucess(){
        this.form.innerHTML = this.configuracoes.sucess;
    }

    displayError(){
        this.form.innerHTML = this.configuracoes.error;
    }

    getFormObject(){
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttibute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event){
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = " Aguarde ..."
    }

    async sendForm(event){
        try {
            this.onSubmission(event);
            await fetch(this.url,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySucess();
        } catch (error){
            this.displayError();
            throw new Error (error);
        }
    }

    init(){
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit ({
    form: "[data-form]",
    button: "[data-button]",
    sucess: "<h1 class='sucess'>Mensagem enviada com sucesso</h1>",
    error: "<h1 class='error'>Não foi possivel enviar sua mensagem</h1>"
});
formSubmit.init();