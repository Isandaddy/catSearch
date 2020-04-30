import Card from "./Card.js";
import { lazyLoad } from "../util/lazyLoad.js";

export default class ResultsSection {
  constructor({ $target, data, onClick, onScroll }) {
    this.data = data;
    this.onClick = onClick;
    this.onScroll = onScroll;
    this.section = document.createElement("section");
    this.section.className = "results-section";
    $target.appendChild(this.section);
    this.render();
    console.log(data);
  }

  setState(data) {
    console.log(data);
    this.data = data;
    this.render();
    lazyLoad();
  }
  render() {
    if (!this.data) return;
    this.section.innerHTML = "";

    if (this.data.length > 0) {
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      this.data.map(cat => {
        new Card({
          $target: cardContainer,
          data: cat
        });
      });
      this.section.appendChild(cardContainer);
    } else {
      const noticeSection = document.createElement("section");
      noticeSection.className = "notice-section";

      const notice = document.createElement("h2");
      notice.className = "notice";
      notice.innerText = "검색 결과가 없습니다.🐱";

      noticeSection.appendChild(notice);
      this.section.appendChild(noticeSection);
    }
  }
}
