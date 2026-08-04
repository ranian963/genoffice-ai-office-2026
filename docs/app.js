const cards = [
  ["Genspark가 공개한 GenOffice 데스크톱 오피스와 Apache-2.0 핵심 코드, ee 폴더의 별도 라이선스"],
  ["GenOffice Docs의 DOCX 편집과 문단 단위 저장 방식"],
  ["GenOffice Sheets의 XLSX 편집과 데이터 분석 기능"],
  ["GenOffice Slides의 PPTX 편집과 PDF·이미지 출력 기능"],
  ["GenOffice PDF의 주석·양식·페이지 작업과 본문 텍스트 직접 편집 불가"],
  ["현재 파일 상태에서 공통 AI 패널과 편집기별 도구를 거쳐 파일에 반영하는 흐름"],
  ["GenOffice AI와 Genspark Plus·Pro 공용 크레딧 가격, 전용 가격 미공개"],
  ["GenOffice의 MS Office 파일 호환 범위와 제한"],
  ["Apache 2.0 핵심 코드와 현재 README·LICENSE만 있는 ee 폴더의 별도 계약 조건"],
  ["GenOffice Alpha를 실무에서 사용하기 전 확인할 항목"],
].map(([alt], index) => ({
  alt,
  src: `cards/genoffice-card-${String(index + 1).padStart(2, "0")}-of-10.webp`,
}));

const track = document.querySelector(".track");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const position = document.querySelector(".position");
const pagination = document.querySelector(".pagination");
let current = 0;

cards.forEach((card, index) => {
  const figure = document.createElement("figure");
  figure.className = "slide";
  figure.setAttribute("aria-label", `${index + 1}번째 카드, 전체 ${cards.length}장`);
  const image = document.createElement("img");
  image.className = "card-image";
  image.src = card.src;
  image.alt = card.alt;
  image.width = 1080;
  image.height = 1350;
  if (index === 0) image.fetchPriority = "high";
  figure.append(image);
  track.append(figure);

  const dot = document.createElement("button");
  dot.className = "page-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `${index + 1}번째 GenOffice 카드로 이동`);
  dot.addEventListener("click", () => moveTo(index));
  pagination.append(dot);
});

function update(index) {
  current = Math.max(0, Math.min(cards.length - 1, index));
  previous.disabled = current === 0;
  next.disabled = current === cards.length - 1;
  position.textContent = `${current + 1} / ${cards.length}`;
  [...pagination.children].forEach((dot, dotIndex) => {
    if (dotIndex === current) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function moveTo(index) {
  update(index);
  track.scrollTo({
    left: track.clientWidth * current,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

previous.addEventListener("click", () => moveTo(current - 1));
next.addEventListener("click", () => moveTo(current + 1));
track.addEventListener("scroll", () => {
  if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
}, { passive: true });
window.addEventListener("keydown", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName))) return;
  if (["ArrowLeft", "ArrowRight", " ", "Home", "End"].includes(event.key)) event.preventDefault();
  if (event.key === "ArrowLeft") moveTo(current - 1);
  if (event.key === "ArrowRight" || event.key === " ") moveTo(current + 1);
  if (event.key === "Home") moveTo(0);
  if (event.key === "End") moveTo(cards.length - 1);
});

update(0);
