export default class Loading {
  constructor({ $target }) {
    this.spinnerWrapper = document.createElement("div");
    this.spinnerWrapper.className = "spinner-wrapper";
    this.spinnerWrapper.classList.add("hidden");

    $target.appendChild(this.spinnerWrapper);

    this.render();
  }

  toggleSpinner() {
    const spinner = document.querySelector(".spinner-wrapper");
    //클래스를 hidden으로 한다.
    spinner.classList.toggle("hidden");
  }

  render() {
    const spinnerImage = document.createElement("img");
    spinnerImage.className = "spinner-image";
    spinnerImage.src = "https://loading.io/icon/ntxr3f";

    this.spinnerWrapper.appendChild(spinnerImage);
  }
}
