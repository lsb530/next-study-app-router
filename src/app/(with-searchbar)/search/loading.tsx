export default function Loading() {
  // 현재 페이지뿐만 아니라, 하위에 있는 모든 비동기 페이지 컴포넌트(export default function ...)에 적용
  // QueryString의 변경에도 페이지 스트리밍이 작동하지 않는다
  return <div>Loading ...</div>
}