class UserController {
  constructor(formIdCreate) {
    this.form = new Form();
    this.formEl = document.getElementById(formIdCreate);
    this.onSubmit();
  }

  onSubmit() {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      let btn = this.formEl.querySelector('[type=submit]');
      btn.disabled = true;
      let values = this.getValues(this.formEl);

      if (!values) return false;
    });
  }

  getValues(formEl) {
    let user = {};
    [...formEl.elements].forEach((field, index) => {
      user[field.name] = field.value;
    });
    console.log(user);
  }
}
