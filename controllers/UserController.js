class UserController {
  constructor(formIdCreate, tableId) {
    this.form = new Form();
    this.formEl = document.getElementById(formIdCreate);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  }

  onSubmit() {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      let btn = this.formEl.querySelector('[type=submit]');
      btn.disabled = true;
      let values = this.getValues(this.formEl);

      if (!values) return false;
      this.getPhoto(this.formEl).then(
        (content) => {
          values.photo = content;

          this.addLine(values);

          this.formEl.reset();

          btn.disabled = false;
        },
        (e) => {
          console.error(e);
        }
      );
    });
  }

  getValues(formEl) {
    let user = {};
    let isValid = true;

    [...formEl.elements].forEach((field, index) => {
      if (
        ['name', 'email', 'password'].indexOf(field.name) > -1 &&
        !field.value
      ) {
        field.parentElement.classList.add('has-error');
        isValid = false;
      }
      if (field.name == 'gender') {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else if (field.name == 'admin') {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value;
      }
    });
    if (!isValid) {
      return false;
    }

    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  getPhoto(formEl) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();

      let elements = [...formEl.elements].filter((item) => {
        if (item.name === 'photo') {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (e) => {
        reject(e);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve('./dist/img/boxed-bg.jpg');
      }
    });
  }
  addLine(dataUser) {
    let tr = this.setTr(dataUser);

    this.tableEl.appendChild(tr);
  }

  setTr(dataUser, tr = null) {
    if (tr === null) tr = document.createElement('tr');

    tr.dataset.user = JSON.stringify(dataUser);

    tr.innerHTML = `
            <td><img src=${
              dataUser.photo
            } alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

    return tr;
  }
}
