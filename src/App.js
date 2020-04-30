import ResultsSection from "./components/ResultsSection.js";
import SearchingSection from "./components/SearchingSection.js";
import { getItem, setItem } from "./util/sessionStorage.js";
import { api } from "./api/theCatApi.js";
import Loading from "./components/Loading.js";

export default class App {
  constructor($target) {
    console.log($target);
    const keywords = getItem("keywords");
    const data = getItem("data");

    const searchingSection = new SearchingSection({
      $target,
      keywords,
      onSearch: async keyword => {
        loading.toggleSpinner();

        const response = await api.fetchCats(keyword);
        if (!response.isError) {
          setItem("data", response.data);
          resultsSection.setState(response.data);
          loading.toggleSpinner();
        } else {
          //error.setState(response.data);
        }
      },
      onRandom: async () => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats();
        if (!response.isError) {
          setItem("data", response.data);
          resultsSection.setState(response.data);
          loading.toggleSpinner();
        } else {
          //error.setState(response.data);
        }
      }
    });
    const loading = new Loading({ $target });
    const resultsSection = new ResultsSection({
      $target,
      data,
      onScroll: async () => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats();
        if (!response.isError) {
          const beforeData = getItem("data");
          //concat기존 배열에 원소 또는 배열을 추가하여 새 배열 만들기
          const nextData = beforeData.concat(response.data);
          setItem("data", nextData);
          resultsSection.setState(nextData);
          loading.toggleSpinner();
        } else {
          //error.setState(response.data);
        }
      }
    });
  }
}
