# WooriAIBook Website

우리AI북 메인 웹사이트입니다. 별도 빌드 과정 없이 `index.html`을 열면 확인할 수 있습니다.

## 이미지 교체

`assets/` 폴더에 아래 파일명으로 이미지를 넣고, `index.html`의 같은 `data-slot` 요소를 `<img>`로 교체하세요.

- `hero-main.webp`
- `philosophy-story.webp`
- `philosophy-thinking.webp`
- `philosophy-creation.webp`
- `service-ownabee.webp`
- `service-beesmart.webp`
- `media-spotlight.webp`
- `gallery-01.webp` ~ `gallery-16.webp`

교체 예시:

```html
<img class="hero-media" src="assets/hero-main.webp" alt="태블릿으로 AI 학습을 체험하는 아이">
```

이미지에 `width: 100%; height: 100%; object-fit: cover;`를 적용하면 기존 영역에 맞게 표시됩니다.
