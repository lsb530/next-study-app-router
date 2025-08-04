import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {delay} from "@/util/delay";

// 모든 동적 페이지에서 필요한 데이터들이 undefined가 됨(ex: searchParams)
// export const dynamic = "force-static"

// 잘못 사용할 경우에 빌드타임에 에러를 발생
// export const dynamic = "error"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  await delay(1500)
  const response = await fetch(`
    ${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  )

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }

  const books: BookData[] = await response.json()

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
