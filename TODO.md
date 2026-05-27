# TODO

## Wedding invitation upgrades (foto public + estetika)
- [x] Analyze current sections (Cover/Couple/Hero/Gallery) and confirm existing assets usage.
- [ ] Update `src/components/wedding/CoverSection.tsx`:
  - [ ] Insert `public/foto-mempelai-wanita.webp` and `public/foto-kedua-mempelai(2).webp` as layered couple visuals.
  - [ ] Incorporate `public/foto-kedua-mempelai.webp` as secondary accent (ribbon/halo) to satisfy “two-two utama”.
- [ ] Update `src/components/wedding/CoupleSection.tsx` to use the new `public` images in place of `src/assets/bride.webp` & `src/assets/groom.webp`.
- [ ] Update `src/components/wedding/GallerySection.tsx` to replace 3 placeholders with the new public photos.
- [ ] (Optional) Update `src/components/wedding/HeroSection.tsx` with a small photo ribbon using `foto-kedua-mempelai(2).webp`.

## Validation
- [ ] Run build/dev.
- [ ] Manual check in browser for layout breakpoints.


