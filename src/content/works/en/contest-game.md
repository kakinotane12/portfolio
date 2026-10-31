---
lang: en
key: contest-game
title: "Entrust(X)"
summary: "A photo-sharing puzzle game built on steganography"
award: |
  🏆Grand Prize, IVRC 2026 Metaverse Division
  🏆Shoichi Hasegawa Award
  Demo at the 31st Annual Conference of the Virtual Reality Society of Japan
description: |
  A puzzle game played in VRChat, built around sharing photos. Take a photo in the game and post it to X with [#EntrustX](https://x.com/search?q=%23EntrustX&src=typed_query), and some time later that photo appears in the world, at the exact spot where it was taken.

  This works through steganography: information is hidden inside the photo itself. A shader writes data such as the camera position into the image, and the server and client decode it.

  The game builds on a habit VRChat users already have, posting souvenir photos to X, and turns it into a way to communicate across time and across instances.

  We developed it as a team of five. I was mainly responsible for the concept and the steganography feature. For this feature, I developed both the process that embeds information in a photo and the process that decodes it. I also developed an embedding method that takes the characteristics of human vision into account so that the hidden data is hard to see, keeping photos looking natural while still decoding them accurately.

  The game won the Grand Prize and the Shoichi Hasegawa Award (Special Jury Prize) in the IVRC 2026 Metaverse Division.

  Write-up: [note (in Japanese)](https://note.com/hadnf/n/n0c41e3211e3d)
  Launch: [Open the world in VRChat](https://vrchat.com/home/launch?worldId=wrld_8bb0c0d8-5cc6-4050-9fc6-420caf14f154)
category: Game Development
period: May 2026 – present
role: "Concept, steganography feature"
tech:
  - VRChat
  - Unity
  - C#
  - UdonSharp
  - HLSL
  - Python
  - JavaScript
  - Render
  - Google Apps Script
  - Git
youtube: "https://youtu.be/_8B_9jyyw9g?si=Lr5RnjBYghxm7h6h"
order: 10
draft: false
---
