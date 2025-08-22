// app/(with-searchbar)/search/page.tsx
import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import {Metadata} from "next";

// 모든 동적 페이지에서 필요한 데이터들이 undefined가 됨(ex: searchParams)
// export const dynamic = "force-static"

// 잘못 사용할 경우에 빌드타임에 에러를 발생
// export const dynamic = "error"

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${encodeURIComponent(q)}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata(
  {searchParams}: {searchParams: Promise<{ q?: string }>}
): Promise<Metadata> {
  // 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 한다
  const { q } = await searchParams

  return {
    title: `${q}: 한입 북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q}: 한입 북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    }
  }
}

export default async function Page({
  // Next.js 15에서 searchParams는 비동기 API이므로 Promise로 들어옵니다
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <Suspense
      key={q}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={q} />
    </Suspense>
  );
}