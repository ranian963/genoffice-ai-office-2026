"use client";

import Image from "next/image";
import { type UIEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./genoffice.module.css";

const CARDS = [
  {
    src: "/genoffice/genoffice-card-01-of-10.webp",
    alt: "Genspark가 공개한 GenOffice 데스크톱 오피스와 Apache-2.0 핵심 코드, ee 폴더의 별도 라이선스",
  },
  {
    src: "/genoffice/genoffice-card-02-of-10.webp",
    alt: "GenOffice Docs의 DOCX 편집과 문단 단위 저장 방식",
  },
  {
    src: "/genoffice/genoffice-card-03-of-10.webp",
    alt: "GenOffice Sheets의 XLSX 편집과 데이터 분석 기능",
  },
  {
    src: "/genoffice/genoffice-card-04-of-10.webp",
    alt: "GenOffice Slides의 PPTX 편집과 PDF·이미지 출력 기능",
  },
  {
    src: "/genoffice/genoffice-card-05-of-10.webp",
    alt: "GenOffice PDF의 주석·양식·페이지 작업과 본문 텍스트 직접 편집 불가",
  },
  {
    src: "/genoffice/genoffice-card-06-of-10.webp",
    alt: "현재 파일 상태에서 공통 AI 패널과 편집기별 도구를 거쳐 파일에 반영하는 흐름",
  },
  {
    src: "/genoffice/genoffice-card-07-of-10.webp",
    alt: "GenOffice AI와 Genspark Plus·Pro 공용 크레딧 가격, 전용 가격 미공개",
  },
  {
    src: "/genoffice/genoffice-card-08-of-10.webp",
    alt: "GenOffice의 MS Office 파일 호환 범위와 제한",
  },
  {
    src: "/genoffice/genoffice-card-09-of-10.webp",
    alt: "Apache 2.0 핵심 코드와 현재 README·LICENSE만 있는 ee 폴더의 별도 계약 조건",
  },
  {
    src: "/genoffice/genoffice-card-10-of-10.webp",
    alt: "GenOffice Alpha를 실무에서 사용하기 전 확인할 항목",
  },
] as const;

const LAST_CARD_INDEX = CARDS.length - 1;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GenOfficeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const boundedIndex = Math.min(LAST_CARD_INDEX, Math.max(0, index));
    setCurrentIndex(boundedIndex);
    track.scrollTo({
      left: track.clientWidth * boundedIndex,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    if (track.clientWidth === 0) return;

    const visibleIndex = Math.min(
      LAST_CARD_INDEX,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
    );
    setCurrentIndex((previousIndex) =>
      previousIndex === visibleIndex ? previousIndex : visibleIndex,
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(
            target.tagName,
          ))
      ) {
        return;
      }

      const step = event.key === "ArrowLeft" ? -1 : 1;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        moveToCard(currentIndex + step);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        moveToCard(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        moveToCard(LAST_CARD_INDEX);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, moveToCard]);

  return (
    <section className={styles.carousel} aria-label="GenOffice 카드 10장">
      <p className={styles.instructions} id="genoffice-carousel-instructions">
        좌우로 밀거나 방향키·스페이스키·Home·End 키로 카드를 이동할 수 있습니다.
      </p>
      <button
        className={styles.navButton}
        type="button"
        onClick={() => moveToCard(currentIndex - 1)}
        disabled={currentIndex === 0}
        aria-label="이전 GenOffice 카드"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m14.5 5-7 7 7 7" />
        </svg>
      </button>

      <div
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
        role="group"
        aria-roledescription="캐러셀"
        aria-describedby="genoffice-carousel-instructions"
      >
        {CARDS.map((card, index) => (
          <figure
            className={styles.slide}
            key={card.src}
            aria-label={`${index + 1}번째 카드, 전체 ${CARDS.length}장`}
          >
            <Image
              className={styles.image}
              src={card.src}
              alt={card.alt}
              width={1080}
              height={1350}
              sizes="(max-width: 700px) calc(100vw - 24px), min(60vw, 760px)"
              priority={index === 0}
              unoptimized
            />
          </figure>
        ))}
      </div>

      <button
        className={styles.navButton}
        type="button"
        onClick={() => moveToCard(currentIndex + 1)}
        disabled={currentIndex === LAST_CARD_INDEX}
        aria-label="다음 GenOffice 카드"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m9.5 5 7 7-7 7" />
        </svg>
      </button>

      <footer className={styles.footer}>
        <p className={styles.position} aria-live="polite" aria-atomic="true">
          {currentIndex + 1} / {CARDS.length}
        </p>
        <div className={styles.pagination} aria-label="GenOffice 카드 바로 가기">
          {CARDS.map((card, index) => (
            <button
              className={styles.pageDot}
              type="button"
              key={card.src}
              onClick={() => moveToCard(index)}
              aria-label={`${index + 1}번째 GenOffice 카드로 이동`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
        <p className={styles.hint}>밀기 · 방향키 · Space</p>
      </footer>
    </section>
  );
}
