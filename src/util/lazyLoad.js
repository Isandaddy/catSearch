export function lazyLoad() {
  //doument내에서 class가 .lazy인 img태그를 모두 반환
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  //브라우저에 IntersectionObserver기능 여부 확인
  //화면에 이미지가 보일때 이미지 로드해서 리소스를 절약
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}
