function getItem(key) {
  const value = sessionStorage.getItem(key);
  //JSON.parse()문자열을 JSON형식으로
  if (value === "data") return value === null ? [] : JSON.parse(value);
  else return value === null ? [] : JSON.parse(value);
}

function setItem(key, value) {
  if (value === null || value === undefined) return;
  //JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환합니다
  const toJson = JSON.stringify(value);
  sessionStorage.setItem(key, toJson);
}

export { getItem, setItem };
