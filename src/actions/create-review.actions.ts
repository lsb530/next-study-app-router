'use server';

import {revalidatePath} from "next/cache";

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
        body: JSON.stringify({ bookId, content, author }),
      },
    );
    console.log(response.status);
    /*
      Server Action 또는 Server Component 에서만 사용 가능
      캐시도 모두 Purge-무효화함(Data Cache + Full Route Cache)
      -> 새로 생성된 페이지를 다시 Full Route cache에 저장하지 않음
      -> 새로고침하면 다이나믹 페이지처럼 생성(풀라우트 캐시에도 데이터가 업데이트됨)
     */
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
