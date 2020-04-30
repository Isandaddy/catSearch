import { setItem } from "../util/sessionStorage.js";

export default class SearchBar {
  constructor({ $target, keywords, onSearch, onRandom }) {
    this.recent = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement("section");
    this.section.className = "searcing-section";
    $target.appendChild(this.section);
    this.render();
  }

  addRecentKeyword(keyword) {
    //includes() 메서드는 하나의 문자열이 다른 문자열에 포함되어 있는지를 판별하고, 결과를 true 또는 false 로 반환합니다.
    //includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
    if (this.recent.includes(keyword)) return;
    //shift() 메서드는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다. 이 메서드는 배열의 길이를 변하게 합니다.
    if (this.recent.length === 5) this.recent.shift();

    this.recent.push(keyword);
    setItem("keywords", this.recent);

    this.render();
  }

  searchByKeyword(keyword) {
    if (keyword.length === 0) return;

    this.addRecentKeyword(keyword);
    this.onSearch(keyword);
  }

  deleteKeyword() {
    const searchBox = document.querySelector(".search-box");
    searchBox.value = "";
  }

  render() {
    this.section.innerHTML = "";
    const randomBtn = document.createElement("span");
    randomBtn.className = "random-btn";
    randomBtn.innerText = "🐱";

    const wrapper = document.createElement("div");
    wrapper.className = "search-box-wrapper";

    const searchBox = document.createElement("input");
    searchBox.className = "search-box";
    searchBox.placeholder = "search Cat";

    const recentKeywords = document.createElement("div");
    recentKeywords.className = "recent-keywords";

    this.recent.map(keyword => {
      const link = document.createElement("span");
      link.className = "keyword";
      link.innerText = keyword;
      link.addEventListener("click", () => {
        this.searchByKeyword(keyword);
      });
      recentKeywords.appendChild(link);
    });
    randomBtn.addEventListener("click", this.onRandom);
    searchBox.addEventListener("focus", this.deleteKeyword);
    //keyup 이벤트는 키보드의 키를 눌렀다 뗄 때 요소에 이벤트를 발생시킵니다
    searchBox.addEventListener("keyup", event => {
      //enter에 반응
      if (event.keyCode === 13) {
        this.searchByKeyword(searchBox.value);
      }
    });
    wrapper.appendChild(searchBox);
    wrapper.appendChild(recentKeywords);
    this.section.appendChild(randomBtn);
    this.section.appendChild(wrapper);
  }
}
