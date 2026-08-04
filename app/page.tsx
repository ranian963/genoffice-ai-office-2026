import type { Metadata } from "next";
import { GenOfficeCarousel } from "./GenOfficeCarousel";
import styles from "./genoffice.module.css";

export const metadata: Metadata = {
  title: "GenOffice 카드 뉴스 · Alpha 데스크톱 AI 오피스",
  description:
    "GenOffice의 Docs, Sheets, Slides, PDF, Super Agent와 Alpha에서 확인할 점을 정리한 카드 뉴스",
};

export default function GenOfficePage() {
  return (
    <main className={styles.pageShell}>
      <header className={styles.masthead}>
        <p className={styles.edition}>GENOFFICE NOTE</p>
        <h1>GenOffice 카드 뉴스</h1>
        <p className={styles.date}>2026. 8. 3.</p>
      </header>
      <GenOfficeCarousel />
    </main>
  );
}
