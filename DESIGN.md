# GenOffice Card Carousel

## Visual direction

The finished 1080×1350 weekly news cards are the product. The page stays quiet: a warm off-white canvas, compact editorial metadata, and controls placed outside the artwork. Nothing may overlay, crop, tint, blur, or decorate the card images.

## Tokens

- `--page`: `#f7f6f2`
- `--paper`: `#fffefb`
- `--ink`: `#252321`
- `--muted`: `#6f6a64`
- `--line`: `#dedad2`
- `--focus`: `#7f79aa`
- spacing: `8px`, `12px`, `16px`, `24px`, `32px`
- card ratio: `4 / 5`
- content width: `min(100%, 760px)`

## Typography

- System Korean sans-serif only: `Apple SD Gothic Neo`, `Noto Sans KR`, sans-serif.
- Interface copy is subordinate to the artwork: 12–16px, regular or semibold.
- No display headline outside the card image.

## Carousel primitive

- Native horizontal scrolling with one full-width slide per snap point.
- Touch and trackpad gestures use browser momentum; buttons and keyboard call the same scroll position.
- No autoplay, looping, parallax, 3D effect, hover enlargement, or transition that competes with the card.
- Previous/next buttons and progress dots always sit outside the image rectangle.
- Buttons disable at the first and last card rather than wrapping.

## Motion

- Programmatic navigation uses native smooth scrolling.
- `prefers-reduced-motion: reduce` changes scrolling to immediate and disables all transitions.
- Motion never changes scale, opacity, or color of the artwork.

## Responsive behavior

- Mobile: card width fills the viewport minus 24px; controls sit below it.
- Tablet and desktop: card height fits inside the viewport while retaining the full 4:5 image; previous/next controls sit in side columns.
- The complete artwork remains visible at every supported viewport.

## Accessibility

- The carousel responds to Left, Right, Space, Home, and End without requiring a preliminary click.
- Each image has a concise topic description and a visible position indicator is announced with `aria-live`.
- Focus rings remain outside the artwork and meet WCAG 2.2 AA contrast.

## Accepted debt

- Text inside the supplied PNG cards is not selectable. Each image therefore receives a descriptive alternative, while the full editorial source remains in the project deliverables.
