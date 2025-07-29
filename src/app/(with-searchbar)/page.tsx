import styles from "./page.module.css";
import ClientComponent from "@/app/(with-searchbar)/client-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent />
    </div>
  )
}
