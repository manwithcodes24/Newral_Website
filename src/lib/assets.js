// All Figma asset URLs.
// ─── TO REPLACE WITH LOCAL FILES ────────────────────────────────────────────
// 1. Run `node fetch-assets.js` (in the project root) with Figma open.
// 2. This creates public/assets/<hash>.<ext> for every file below.
// 3. Then swap the BASE constant:
//       const BASE = '/assets'
//    instead of the localhost URL, and images will load from your own server.
// ────────────────────────────────────────────────────────────────────────────

const BASE = '/assets'

export const A = {
  // nav / logos
  logo:            `${BASE}/91b3c218426035e5d9bae21c3499672ca4c27fe8.svg`,
  menuIcon:        `${BASE}/9786bfdb45d22015cc86745e5da9fe239373cc80.svg`,
  arrowSm:         `${BASE}/dc09f850552045bd4b0e8fb21d4336559ba16afa.svg`,
  arrowLg:         `${BASE}/827a07171e95a01c6075699134dbc247ba3c7fe9.svg`,
  whatsapp:        `${BASE}/62241f9d24dbbb24a4c87d3d238b219f7e7e0df4.svg`,
  arrowUp:         `${BASE}/689b5cd0ba72c0f907cc832803b1f60974a8b01f.svg`,

  // hero
  heroBg:          `${BASE}/73b26bce1817a7bdbe7d5b4a3508e620d4ef23ad.webp`,
  heroBgMobile:    `${BASE}/e06f1ee1dbdc3c0071bcaaa40c94885039f10c93.webp`,
  heroCardBack:    `${BASE}/c95295165d5e9fe5016b252f240d9f319fd8d715.webp`,
  heroFlip1:       `${BASE}/a6dc6fac853ea865a00d69b88f5e1e355bfdbe30.webp`,
  heroFlip2:       `${BASE}/76cca9ada26cf6e63acfeff65c7770680a25dc72.webp`,
  heroFlip3:       `${BASE}/7408146f1b26fd70891a27d85a4eb5a978e1d063.webp`,
  heroInline1:     `${BASE}/16171ac696aecfb84f11ec65f1b27399559233e7.webp`,
  heroInline2:     `${BASE}/1fbe1fb326457211e899977a5ba98e74b5c077af.png`,
  heroInline3:     `${BASE}/0c8ca4ffc62b053b78b63ad79b58540ee056d1b9.webp`,
  heroInlineGif:   `${BASE}/hero_inline.gif`,
  heroInlineWebp:  `${BASE}/hero_inline.webp`,

  // video section
  videoThumb:      `${BASE}/89882cd565da57a2292b79bc66bc4a33f62c6e64.webp`,

  // logo strips
  logoImg8:        `${BASE}/omega.png`,         // Omega Elevators
  logoImg9:        `${BASE}/logo1.png`,         // Competishun
  logoImg10:       `${BASE}/logo3.png`,         // Bansal Classes
  logoImg11:       `${BASE}/neet.png`,          // NEET kaka JEE
  logoImg12:       `${BASE}/logo4.png`,         // FIZZ
  logoImg13:       `${BASE}/upto_cropped.png`,  // Up-to

  // pricing
  planWave:        `${BASE}/8bcaabec0b1757ef4d60eb09448a56babae56ff6.svg`,

  // services
  serviceShot:     `${BASE}/0c8ca4ffc62b053b78b63ad79b58540ee056d1b9.webp`,

  // stat card waves
  wave1:           `${BASE}/60a1d436bd964cbfb657eac3d3b59d132500fe44.svg`,
  wave2:           `${BASE}/536c83bb0de58d249a18b8783d19db1cc136f402.svg`,
  wave3:           `${BASE}/ee6bde332ae5ec32d620e126114ed6498277a46f.svg`,
  wave4:           `${BASE}/2f301ac4d55fb09c1832aa5bcced95a749c70c23.svg`,

  // how we work
  howBg:           `${BASE}/582b24d77ddf416a246944e83f06e30ebde406fb.jpg`,
  howCardBack:     `${BASE}/5b796acec867bd99e8c942095ec984622d45fc43.webp`,
  howCardFront:    `${BASE}/f98394200787d559ab950fba45ce3777d540306c.jpg`,
  howWeWork1:      `${BASE}/how_we_work_1_new.webp`,
  howWeWork2:      `${BASE}/how_we_work_2.webp`,
  howWeWork3:      `${BASE}/how_we_work_3.webp`,

  // testimonial
  tThumb1:         `${BASE}/a4f152078a91eda5323de37120e6933df3754433.webp`,
  tThumb2:         `${BASE}/82f7313c6f249b0b53a411ed5789fbcc224882b7.webp`,
  tThumb3:         `${BASE}/9ec97cb104f39a4f01f66c60f31a802168d61227.png`,
  tThumb4:         `${BASE}/abhimanyu_kumawat.png`,
  sameerBansal:    `${BASE}/sameer_bansal.jpg`,
  astonCofer:      `${BASE}/aston_cofer.png`,
  mohitTyagi:      `${BASE}/mohit_tyagi.png`,
  tThumb5:         `${BASE}/0a2fdfc16fed16430d3842b1001a2b6fd19bb01d.webp`,
  tThumb6:         `${BASE}/97510e75383502f356d9ab338e8acefbf1b92c18.webp`,
  tStars:          `${BASE}/d0b070ceb29d886b9f7ddb862f6563addba71868.svg`,
  tAvatar:         `${BASE}/79d379a73881219461ffcbaa96be86478d022b08.png`,

  // footer CTA
  footerGlow:      `${BASE}/b1ed1ca14a3612cc449ff04fdf94c5f2e2dc51ef.svg`,
  footerWave:      `${BASE}/537d22aac1c8bff2380491a51dc73f1ec0db6e19.svg`,
  calendarImg:     `${BASE}/8e34f2746b8853294a02e4da463f0fae3fa0835e.webp`,

  // footer
  footerLogo:      `${BASE}/41011141bb93456220ba1038642989fbfe26f9c7.png`,
  instagram:       `${BASE}/80111781a85f20899ebc060bcf4e9897de5e5585.svg`,
  linkedin:        `${BASE}/147d6a4fe644dd67f69df422183e3909c4b98145.svg`,
  dribbble:        `${BASE}/3b0b5b4744eef8674fe989cd52f6f61562b41586.svg`,

  // about page assets
  aboutHeroBg:     `${BASE}/344_52.webp`,
  aboutPolaroid:   `${BASE}/344_81.webp`,
  aboutBadge:      `${BASE}/04a330e4370174cf5a4e5fcbb0868930b7a6a495.png`,
  aboutValueOrb1:  `${BASE}/344_283.png`,
  aboutValueOrb2:  `${BASE}/344_284.png`,
  aboutValueOrb3:  `${BASE}/344_286.png`,
  aboutTeam1:      `${BASE}/c1e605c2a7e948003ceffc2b4286362c088ed112.webp`,
  aboutTeam2:      `${BASE}/675bd477843439205b24b966e0c99bbb9008f77b.webp`,
  aboutTeam3:      `${BASE}/d490514a829f738c0f7e40970c4aff2bcd0953ad.webp`,
  aboutMission:    `${BASE}/about_mission_new.webp`,
  aboutJoinTeam:   `${BASE}/about_join_team_new.webp`,
  aboutPolaroidReal: `${BASE}/about_polaroid_real.webp`,
  dreamTeam1: `${BASE}/dreamTeam_1.webp`,
  dreamTeam2: `${BASE}/dreamTeam_2.webp`,
  dreamTeam3: `${BASE}/dreamTeam_3.webp`,
  dreamTeam4: `${BASE}/dreamTeam_4.webp`,
  dreamTeam5: `${BASE}/dreamTeam_5.webp`,
   dreamTeam7: `${BASE}/dreamTeam_7.webp`,
  aboutTeamCoffee: `${BASE}/f6b99daddc8e0eb4ba80f78e85ce9d73eae57b05.jpg`,
}
