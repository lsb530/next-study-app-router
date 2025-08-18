'use server';

import {revalidateTag} from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({bookId, content, author}),
      },
    );
    console.log(response.status);
    /*
      Server Action 또는 Server Component 에서만 사용 가능
      캐시도 모두 Purge-무효화함(Data Cache + Full Route Cache)
      -> 새로 생성된 페이지를 다시 Full Route cache에 저장하지 않음
      -> 새로고침하면 다이나믹 페이지처럼 생성(풀라우트 캐시에도 데이터가 업데이트됨)
     */
    // revalidatePath(`/book/${bookId}`)

    // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`)

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page')

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', 'layout')

    // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout')

    // 5. 태그 기준, 데이터 캐시 재검증(효율적인 방법)
    revalidateTag(`review-${bookId}`)
  } catch (err) {
    console.error(err);
    return;
  }
}
