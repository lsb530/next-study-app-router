## 한입북스(One Bite Books)
- Swagger-UI
![swagger-ui.png](img/swagger-ui.png)

- Book List
![book-list.png](img/book-list.png)
- Book Search
![book-search.png](img/book-search.png)
- Book Details
![book-detail.png](img/book-detail.png)

## Vercel Deploy
[배포 사이트](https://onebite-books-app-seven-nu.vercel.app/)

## 이미지 최적화
### Code
- as-is: `<img src={coverImgUrl} />`
- to-be: `<Image src={coverImgUrl} width={80} height={105} alt={""} />`

### Config
```typescript
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  images: {
    // deprecated
    // domains: ["shopping-phinf.pstatic.net"],
      
    // add this
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        pathname: '**',
      }
    ]
  }
}; 

export default nextConfig;
``` 

### Result
- Optimization type(jpeg->webp), size, time, lazy loading
  ![optimization_img.png](img/optimization_img.png)


## 재배포 CLI
`vercel --prod`

## Vercel 최적화
Region 변경하기(iad1 -> icn1)
- default(USA 워싱턴 DC) -> Seoul Korea(Asia Pacific) 
![vercel_region.png](img/vercel_region.png)