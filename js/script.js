// nav 하위 a의 href 값 취득
const links = gsap.utils.toArray('nav ul li a');
links.forEach((link) => {
  let ele = document.querySelector(link.getAttribute('href'));
  let linkST = ScrollTrigger.create({
    trigger: ele,
    start: 'top top',
  })

  ScrollTrigger.create({
    trigger: ele,//이벤트 감지대상(section#section0~4)
    start: 'top center', //스크롤이 섹션 상단에서 50% 지점도달시 시작
    end: 'bottom center',
    onToggle: (self) => setActive(link), //스크롤 영역에 도달시 활성화 벗어나면 비활성화 하는 옵션 , 함수로 작성
  })

  // nav의 부드러운 스크롤
  link.addEventListener('click', (e) => {
    e.preventDefault();
    setActive(link)
    gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: 'auto' })
  })

})

function setActive(link) {
  links.forEach((el) => { el.classList.remove('active'); })
  link.classList.add('active');
}